from datetime import datetime
from pydantic import BaseModel


class Books(BaseModel):
    book_id = int
    book_name = str
    price = float
    quantity = int

    class Config:
        orm_mode = True