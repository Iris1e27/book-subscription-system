# book-subscription-system
A group project for COMS E6156, written by 6 people

## How to run

0. use datagrip to set up database and schema first, url should be the same as database.py in all folders (you should run sql_create_table in datagrip)
1. install all dependencies
2. run frontend and backend app independently

- Terminal 0: 
  - `cd frontend`
  - `npm install package`
  - `npm start`

- Terminal 1,2,3,4: 
  - `cd order` and `cd book` and `cd user` and `cd composition`
  - `pip install -r requirements.txt`
  - `python main.py`
  - or if no main `uvicorn main:app --reload` (default port is 8000)


