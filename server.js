const express = require('express');
const pool = require('./pool.js');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json()); 

//get list of products
app.get('/products', (req, res)=>{
    const sqlText= `SELECT * FROM products;`;
    pool.query(sqlText)
    .then( (result) => {
      console.log(`Got products back from the database`, result.rows);
      res.send(result.rows);
    })
    .catch( (error) => {
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



app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});