from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base


class Transaction(Base):

    __tablename__ = "transactions"

    id = Column(String, primary_key=True)

    user_id = Column(String)

    recipient_id = Column(String)

    amount = Column(Float)

    currency = Column(String)

    status = Column(String)

    created_at = Column(DateTime, default=func.now())