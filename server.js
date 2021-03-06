const express = require('express');
const pool = require('./pool.js');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json()); 

//get list of products
app.get('/products', (req, res)=>{
    console.log('hello', req.query);
    let query = {};
    if (req.query.name) {
        query = {
            text: `SELECT * FROM products WHERE name=$1`,
            values: [req.query.name]
        }
    } else {
        query = {
            text: 'SELECT * FROM products;'
        }
    }

    pool.query(query)
    .then( (result) => {
      console.log(`Got all products from the database`, result.rows);
      res.send(result.rows);
    })
    .catch( (error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    })
})

//get product by id
app.get('/products/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Get request for id', reqId);
    let sqlText = 'SELECT * FROM products WHERE id=$1;';
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('Got product from database:', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})

//add product
app.post('/products', (req, res)=>{
    let product = req.body;
    const sqlText = `INSERT INTO products (name, price) VALUES 
  ($1, $2);`;
  pool.query(sqlText, [product.name, product.price])
        .then((result) => {
            console.log(result);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
    })
});

//update a product
app.put('/products/:id', (req, res) => {
    let reqId = req.params.id;
    let product = req.body;
    let sqlText = `UPDATE products SET name=$1, price=$2 WHERE id=$3`;
    pool.query(sqlText, [product.name, product.price, reqId])
        .then((result)=>{
            console.log('product updated');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})

// delete a product
app.delete('/products/:id', (req, res) => {
    const reqId = req.params.id;
    const sqlText = `DELETE FROM products WHERE id=$1;`;
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log(`deleted product from database`, reqId);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});