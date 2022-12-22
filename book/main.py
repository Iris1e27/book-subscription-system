import json

from fastapi import Depends, FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse
from starlette.responses import RedirectResponse
from sqlalchemy.orm import Session
from fastapi import Form
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from model import Books
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


def get_database_session():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.get("/books")
async def read_orders(request: Request, db: Session = Depends(get_database_session)):
    orders = db.query(Books).all()
    return orders

@app.post("/books")
async def create_order(request: Request, db: Session = Depends(get_database_session)):
    data = await request.json()
    print(data)
    books = Books(book_name=data["book_name"], price=data["price"], quantity=data["quantity"])
    db.add(books)
    db.commit()
    db.refresh(books)
    response = RedirectResponse('/books', status_code=303)
    return response

@app.delete("/books/{id}")
async def delete_book(request: Request, id: int, db: Session = Depends(get_database_session)):
    book = db.query(Books).get(id)
    db.delete(book)
    db.commit()
    return JSONResponse(status_code=200, content={
        "status_code": 200,
        "message": "success",
        "book": None
    })

@app.patch("/books/{id}")
async def update_book(request: Request, id: int, db: Session = Depends(get_database_session)):
    requestBody = await request.json()
    book = db.query(Books).get(id)
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
    uvicorn.run(app, host="127.0.0.1", port=8001)