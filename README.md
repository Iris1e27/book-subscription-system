# book-subscription-system
A group project for COMS E6156, written by 6 people

## How to run

1. install all dependencies
2. run frontend and backend app independently

- Terminal 0: 
  - `cd frontend`
  - `npm install package`
  - `npm start`

- Terminal 1,2,3: 
  - `cd order` and `cd book` and `cd user`
  - `pip install -r requirements.txt`
  - `python main.py`
  - or if no main `uvicorn main:app --reload` (default port is 8000)


