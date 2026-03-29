from fastapi import FastAPI, Depends, Header, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from jose import jwt, JWTError
from datetime import datetime, timedelta
from uuid import uuid4

from app.database import get_db
from app.schemas import TransactionCreate
from app.models import Transaction
from app.services.transaction_service import create_transaction
from app.middleware import log_requests
from app.services.ai_service import detect_anomaly

from app.database import engine, Base
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app):

    async with engine.begin() as conn:

        await conn.run_sync(Base.metadata.create_all)

    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.middleware("http")(log_requests)


security = HTTPBearer()

SECRET_KEY = "secret"
ALGORITHM = "HS256"


IDEMPOTENCY_STORE = {}


# ---------------- JWT helpers ---------------- #

def create_token(user_id: str, role: str):

    payload = {

        "sub": user_id,

        "role": role,

        "exp": datetime.utcnow() + timedelta(hours=2)
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str):

    try:

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        return payload

    except JWTError:

        raise HTTPException(

            status_code=401,

            detail="Invalid token"
        )


def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(security)

):

    return decode_token(credentials.credentials)


def require_role(role: str):

    def checker(user = Depends(get_current_user)):

        if user["role"] != role:

            raise HTTPException(

                status_code=403,

                detail="Forbidden"
            )

        return user

    return checker


# ---------------- auth route ---------------- #

@app.post("/login")

def login():

    new_user_id = str(uuid4())

    token = create_token(

        user_id=new_user_id,

        role="admin"
    )

    return {

        "access_token": token,

        "user_id": new_user_id
    }


# ---------------- transactions ---------------- #

@app.post("/transactions")

async def create_txn(

    txn: TransactionCreate,

    idempotency_key: str = Header(...),

    user = Depends(get_current_user),

    db: AsyncSession = Depends(get_db)
):

    if idempotency_key in IDEMPOTENCY_STORE:

        return IDEMPOTENCY_STORE[idempotency_key]


    txn_dict = txn.dict()

    txn_dict["user_id"] = user["sub"]


    risk_analysis = await detect_anomaly(txn_dict)


    result = await create_transaction(

        db,

        txn,

        user["sub"]
    )


    response = {

        "transaction": {

            "id": result.id,

            "amount": result.amount,

            "currency": result.currency,

            "recipient_id": result.recipient_id,

            "status": result.status,

            "user_id": result.user_id
        },

        "risk_analysis": risk_analysis
    }


    IDEMPOTENCY_STORE[idempotency_key] = response


    return response


# ---------------- list transactions ---------------- #

@app.get("/transactions")

async def list_transactions(

    limit: int = 10,

    db: AsyncSession = Depends(get_db),

    user = Depends(get_current_user)

):

    query = (

        select(Transaction)

        .where(Transaction.user_id == user["sub"])

        .limit(limit)
    )

    result = await db.execute(query)

    transactions = result.scalars().all()

    return transactions


# ---------------- admin route ---------------- #

@app.get("/admin-data")

async def admin_data(

    user = Depends(require_role("admin"))

):

    return {

        "message": "admin access granted",

        "user": user["sub"]
    }