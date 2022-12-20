from pydantic import BaseModel


class User(BaseModel):
    user_id = int
    email = str
    address = str

    class Config:
        orm_mode = True