from typing import Text
from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer, Text, DateTime, Float
from database import Base

class Books(Base):
    __tablename__ = "books"

    book_id = Column(Integer, primary_key=True, index=True)
    book_name = Column(String(100))
    price = Column(Float)
    quantity = Column(Integer)