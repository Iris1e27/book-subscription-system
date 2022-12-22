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
from model import Order
import schema
from database import SessionLocal, engine
import model

from datetime import datetime

app = FastAPI()

model.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],#http://localhost:3000
    allow_methods=['*'],
    allow_headers=['*']
)

HOST = '127.0.0.1'
PORT = 8002

def get_database_session():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.get("/orders")
async def read_orders(request: Request, db: Session = Depends(get_database_session)):
    orders = db.query(Order).all()
    return orders

@app.post("/orders")
async def create_order(request: Request, db: Session = Depends(get_database_session)):
    data = await request.json()
    print(data)
    order = Order(user_id=data["user_id"], book_id=data["book_id"], book_name=data["book_name"], price=data["price"],
                  quantity=data["quantity"], subscribed_at=datetime.now())
    db.add(order)
    db.commit()
    db.refresh(order)
    response = RedirectResponse('/orders', status_code=303)
    return response


@app.delete("/orders/{id}")
async def delete_order(request: Request, id: int, db: Session = Depends(get_database_session)):
    order = db.query(Order).get(id)
    db.delete(order)
    db.commit()
    return JSONResponse(status_code=200, content={
        "status_code": 200,
        "message": "success",
        "order": None
    })


@app.patch("/orders/{id}")
async def update_book(request: Request, id: int, db: Session = Depends(get_database_session)):
    requestBody = await request.json()
    book = db.query(Order).get(id)
    book.quantity = requestBody['update_num']
    db.commit()
    db.refresh(book)
    newBook = jsonable_encoder(book)
    return JSONResponse(status_code=200, content={
        "status_code": 200,
        "message": "success",
        "book": newBook
    })


if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)