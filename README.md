# Setup

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

# Requests