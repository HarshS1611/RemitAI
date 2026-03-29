from uuid import uuid4
from sqlalchemy.ext.asyncio import AsyncSession
from app.models import Transaction


async def create_transaction(db: AsyncSession, data, user_id):

    txn = Transaction(

        id=str(uuid4()),

        user_id=user_id,

        recipient_id=str(data.recipient_id),

        amount=float(data.amount),

        currency=data.currency,

        status="pending"
    )

    db.add(txn)

    await db.commit()

    await db.refresh(txn)

    return txn