from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer, Text
from database import Base

class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String(128))
    address = Column(Text)
