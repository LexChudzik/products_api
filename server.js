const express = require('express');
const pool = require('./pool.js');
const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});

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