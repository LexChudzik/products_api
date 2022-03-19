## Setup

Create postgres database:

```CREATE DATABASE products
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
CREATE TABLE products (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (1000) NOT NULL,
    "price" NUMERIC (15,2) NOT NULL
);
```

Create .env file with postgres user and password, plus database name, host and port if they are different from the defaults:
```
PG_PASSWORD=
PG_USER=
DATABSE_NAME=
DATABASE_SERVER=
DATABASE_PORT=
```

Start the server:
```npm install
npm start```

## Requests

-GET /products
Get all products

-GET /products?name={name}
Get any products with a matching name

-GET /products/{id}
Get product by id

-POST /products
Add a product
Body of the request should contain a JSON object with the name and price

-PUT /products/{id}
Update a product by id
Body of the request should contain a JSON object with the name and price

-DELETE /products/{id}
Delete a product by id