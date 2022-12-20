import json

from fastapi import Depends, FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse
from starlette.responses import RedirectResponse
from sqlalchemy.orm import Session
from fastapi import Form
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from model import User
import schema
from database import SessionLocal, engine
import model

app = FastAPI()

model.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*']
)


def get_database_session():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

@app.get("/users")
async def read_users(request: Request, db: Session = Depends(get_database_session)):
    users = db.query(User).all()
    return users

@app.post("/users")
async def create_user(request: Request, db: Session = Depends(get_database_session)):
    data = await request.json()
    print(data)
    users = User(email=data["email"], address=data["address"])
    db.add(users)
    db.commit()
    db.refresh(users)
    response = RedirectResponse('/users', status_code=303)
    return response

@app.delete("/users/{id}")
async def delete_user(request: Request, id: int, db: Session = Depends(get_database_session)):
    user = db.query(User).get(id)
    db.delete(user)
    db.commit()
    return JSONResponse(status_code=200, content={
        "status_code": 200,
        "message": "success",
        "user": None
    })

@app.patch("/users/{id}")
async def update_user(request: Request, id: int, db: Session = Depends(get_database_session)):
    requestBody = await request.json()
    user = db.query(User).get(id)
    user.address = requestBody['update_str']
    db.commit()
    db.refresh(user)
    newUser = jsonable_encoder(user)
    return JSONResponse(status_code=200, content={
        "status_code": 200,
        "message": "success",
        "user": newUser
    })


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
