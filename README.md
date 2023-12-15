# CartIt

## Introduction

This project is a seller's admin page where each seller can login and update their products. It intend to cover both frontend and backend stack.

## Technologies

For this project, we used different technologies for this project:

### Frontend

-   Reactjs
-   Tailwindcss

### Backend

-   Flask

## APIs Implemented

_For authenitication of merchants/users_

-   http://localhost:5000/api/v1/auth/login
-   http://localhost:5000/api/v1/auth/logout
-   http://localhost:5000/api/v1/auth/profile

_For creating, reading, updating and deleting a category_

-   http://localhost:5000/api/v1/category/new
-   http://localhost:5000/api/v1/category/edit/index
-   http://localhost:5000/api/v1/category/delete
-   http://localhost:5000/api/v1/category/all

_For creating, reading, updating and deleting a category_

-   http://localhost:5000/api/v1/product/new
-   http://localhost:5000/api/v1/product/edit/index
-   http://localhost:5000/api/v1/product/delete
-   http://localhost:5000/api/v1/product/all

# Examples on how to call the endpoints

Although these endpoints are consumed from our frontend design using reactjs but for testing purposes, it can be called from the terminal using the following examples:

-   First step: Clone the repo

```
git clone https://github.com/Topsurpass/Cart-IT/
```

-   Second step: Change your directory into the backend folder of the project

```
cd Cartit/Flask_Mongo
```

-   Third step: Start your flask app

```
python3 app.py
```

## User authentication APIs

### Endpoint for signing up new user / merchant

This will create new account for a merchant. On a separate terminal, run the code below and adjust the parameter to your taste.

```
curl -X POST -d 'merchant=yourname&email=youremail&username=yourusername&password=yourpassword&phone=yourphone&addredd=youraddress' http://localhost:5000/api/v1/auth/signup
```

### Endpoint for loggin in new user / merchant

On every successful login, a session id will be generated. The session id will be used to authenticate each merchant and to identify their products and category.

```
curl -X POST -b 'session_id=yoursessionid' -d 'email=youremail&password=yourpassword' http://localhost:5000/api/v1/auth/login
```

### Endpoint for logging out a user/merchant

This endpoint will delete session id of a merchant and log him/her out.

```
curl -X DELETE -b 'session_id=yoursessionid' localhost:5000/api/v1/auth/logout
```

## Merchants category APIs

### Endpoint for adding new category of product

This will add new category of product for a merchant

```
curl -X POST -b 'session_id=yoursessionid' -d 'name=categoryname&description=categoryfulldescription' http://localhost:5000/api/v1/category/new
```

### Endpoint for editing/updating existing category of product

This will update details of a category of product for a merchant

```
curl -X PUT -b 'session_id=yoursessionid' -d 'name=categoryname&description=categoryfulldescription' http://localhost:5000/api/v1/category/edit/index
```

### Endpoint for deleting existing category of product for a merchant

This will delete a particular category with all of its products for a merchant

```
curl -X DELETE -b 'session_id=yoursessionid' http://localhost:5000/api/v1/category/delete/index
```

### Endpoint for listing all categories of a merchant

This will list all category of products created by a merchant

```
curl -X GET -b 'session_id=yoursessionid' http://localhost:5000/api/v1/category/all
```
