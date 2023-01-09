# book-subscription-system
A group project for COMS E6156, written by 6 people

# Overview

## How to run

0. Use datagrip to set up database and schema and change credentials first
1. Install all dependencies
2. Run frontend and backend app independently

- Run sql
  - modify your database url in every database.py in all folders
  - run sql_create_table.sql in datagrip to create schema
  
- Update credentials as your own when you want to use google login in local
  - create your own google cloud API credentials because my credentials have expired
    - create OAuth 2.0 Client IDs
    - Authorized JavaScript origins: http://127.0.0.1:5000
    - Authorized redirect URIs: http://127.0.0.1:5000/auth
  - modify credentials in book-subscription-system/composition/main.py to use your own 
    - GOOGLE_CLIENT_ID = "....apps.googleusercontent.com"
    - GOOGLE_CLIENT_SECRET = "GOCSPX-..."

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

### Tools or frameworks
- fastapi as a backend framework
- react.js as a frontend framework
- we use microservices as a software architecture (each folder is a microservice)
- mysql database (rds in aws)

### REST APIs
- `/`
- `/login`
- `/auth`
- `/books`
- `/books/{id}`
- `/orders`
- `/orders/{id}`
- `/users`
- `/users/{id}`
- `/users/search-by-email`
- `/users/json`
- ...

## About AWS deployment

![image](https://user-images.githubusercontent.com/42087697/211357136-18800b38-5c28-435e-bb04-9503b57d2988.png)

## About results

Identity selection interface
![image](https://user-images.githubusercontent.com/42087697/211355139-bab26d84-8213-4b47-8536-1d4b8cc3c468.png)

Administrator management intgerface (view all orders)
![image](https://user-images.githubusercontent.com/42087697/211355432-70fdd37d-8ead-4e14-838f-086a439b3a69.png)

Add interface (user)
![image](https://user-images.githubusercontent.com/42087697/211355714-3b06823d-1b1b-4bee-bf2d-947301bd768c.png)

Login interface
![image](https://user-images.githubusercontent.com/42087697/211355817-5f4c018f-e7e1-44c7-bd08-56bc23177f4d.png)

Register interface
![image](https://user-images.githubusercontent.com/42087697/211355857-2a771a11-fdc0-4ab1-af48-f2615ae5d502.png)

Customer interface
![image](https://user-images.githubusercontent.com/42087697/211356097-92d06270-8f7e-4467-9f12-c96f379f8b93.png)

Customer orderlist interface (only view his own order)
![image](https://user-images.githubusercontent.com/42087697/211356181-cbb3d786-c6de-4e91-af88-47b2aa044809.png)
