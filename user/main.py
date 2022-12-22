import json

from fastapi import Depends, FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse
from sqlalchemy import select
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
    allow_origins=['*'],#'http://localhost:3000'
    allow_methods=['*'],
    allow_headers=['*']
)

HOST = '127.0.0.1'
PORT = 8000

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

@app.get("/users/{id}")
async def get_user(request: Request, id: int, db: Session = Depends(get_database_session)):
    user = db.query(User).get(id)
    return user

@app.post("/users")
async def create_user(request: Request, db: Session = Depends(get_database_session)):
    data = await request.json()
    print(data)
    user = User(email=data["email"], address=data["address"])
    db.add(user)
    db.commit()
    db.refresh(user)
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

@app.post("/users/search-by-email")
async def update_user(request: Request, db: Session = Depends(get_database_session)):
    requestBodyor = await request.json()
    requestBody = json.loads(requestBodyor)
    print(requestBody["email"])
    statement = select(User).filter_by(email=requestBody["email"])
    user = db.scalars(statement).all()
    print(len(user))
    the_user = jsonable_encoder(user)
    #print(the_user)
    if len(the_user) == 0:
        print('sdssdsds')
        JSONResponse(status_code=200, content={
            "status_code": 200,
            "message": "sucess",
            "user": the_user
        })
    else:
        print('2222222')
        return JSONResponse(status_code=200, content={
            "status_code": 200,
            "message": "success",
            "user": the_user
        })


@app.post("/users/json")
async def create_user(request: Request, db: Session = Depends(get_database_session)):
    dataor = await request.json()
    data = json.loads(dataor)
    print(data)
    users = User(email=data["email"], address=data["address"])
    db.add(users)
    db.commit()
    db.refresh(users)
    statement2 = select(User).filter_by(email=data["email"])
    user = db.scalars(statement2).all()
    the_user = jsonable_encoder(user)
    return JSONResponse(status_code=200, content={
        "status_code": 200,
        "message": "sucess",
        "user": the_user
    })

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)
