# book-subscription-system
A group project for COMS E6156, written by 6 people

## How to run

0. Use datagrip to set up database and schema first
1. install all dependencies
2. run frontend and backend app independently

- Run sql
  - modify your database url in every database.py in all folders
  - run sql_create_table.sql in datagrip to create schema

- Terminal 0: 
  - `cd frontend`
  - `npm install package`
  - `npm start`

- Terminal 1,2,3,4: 
  - `cd order` and `cd book` and `cd user` and `cd composition`
  - `pip install -r requirements.txt`
  - `python main.py`
  - or if no main `uvicorn main:app --reload` (default port is 8000)

## About requirements

- sprint 1: https://github.com/donald-f-ferguson/Topics-in-SW-Engineering-F22/blob/main/Sprints/SPRINT-1.md
- sprint 2: https://github.com/donald-f-ferguson/Topics-in-SW-Engineering-F22/blob/main/docs/Project-Sprints/README-Sprint-2.md

## About implementation

- fastapi as a backend framework
- react.js as a frontend framework
- we use microservices as a software architecture (each folder is a microservice)
- mysql database (rds in aws)
