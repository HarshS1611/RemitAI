from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from datetime import datetime, timedelta


SECRET_KEY = "secret"

ALGORITHM = "HS256"


def create_token(user_id: str, role: str):

    payload = {

        "sub": user_id,

        "role": role,

        "exp": datetime.utcnow() + timedelta(hours=2)
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str):

    try:

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        return payload

    except JWTError:

        raise HTTPException(status_code=401, detail="Invalid token")