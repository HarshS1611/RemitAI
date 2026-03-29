from pydantic import BaseModel
from uuid import UUID
from decimal import Decimal

class TransactionCreate(BaseModel):

    amount: Decimal
    currency: str
    recipient_id: UUID


class TransactionResponse(BaseModel):

    id: str
    amount: Decimal
    currency: str
    status: str

    class Config:
        from_attributes = True