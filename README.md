# Online pizza shop

## Discription
Online shop app with 2 access level.
1 - Customer. He can add products to cart from catalog. Can see personal info from Personal Area.
2 - Admin. Can add new products. Can get personal customer info and edit her.
Registration is made with an access token. All passwords are hashed.

## How to start app
You need: 
1) Setup mysql database
    a) Create new database in mysql. All scripts you can find in file "angular_pizza_database" pathj=..backend/angular_pizza_database.sql
    b) Create .env.local in backend folder and specify:
        PORT = 5000
        DB_USER = "username"
        DB_PASSWORD = "password"
        DB_NAME = angular_pizza
1) Open frontend folder and run script: 
npm start
2) Open backend folder and run script:
npm start
3) Open browser and go to "http://localhost:4200/"

If you want register Admin in database you should swap "USER" for a "ADMIN" in backend/src/controllers in registration function (line 19). After this open "http://localhost:4200/registration" and register new user. Don't forget swap "ADMIN" for a "USER".

## Tech Stack
Frontend: Angular, NGRX
Backend: express, jsonwebtoken, bcryptjs, nodemon