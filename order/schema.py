from datetime import datetime
from pydantic import BaseModel


class Order(BaseModel):
    order_id = int
    user_id = int
    book_id = int
    book_name = str
    price = float
    subcribed_at = datetime

    class Config:
        orm_mode = True