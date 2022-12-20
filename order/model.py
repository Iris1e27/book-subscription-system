from typing import Text
from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer, Text, DateTime, Float
from database import Base

class Order(Base):
    __tablename__ = "Order"

    order_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    book_id = Column(Integer)
    book_name = Column(String(100))
    price = Column(Float)
    quantity = Column(Integer)
    subscribed_at = Column(DateTime)
