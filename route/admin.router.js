const { uuid } = require('uuidv4');
const db = require('../db')
var express = require('express');
var adminRouter = express.Router();





adminRouter.post('/createProduct', async (req, res) => {
    console.log(uuid())
    let product_id = uuid();
    await    db
                .query('INSERT INTO products (product_id, title, price) VALUES ($1, $2, $3)', [product_id, req.body.title, req.body.price])
                .then(re => {
                    console.log(re)
                    res.send(true)
                })
                .catch(err => {
                    console.log(err)
                    res.send(false)
                });
});
//miss cookie permision

adminRouter.put('/deleteProduct/:product_id', async (req, res) => {
    let product_id = req.params.product_id 
    await db
            .query('DELETE FROM products WHERE product_id = $1', [product_id]) 
            .then(result => {
                res.redirect('/')
            })
            .catch(err => {
                res.redirect('/')
            })
})
//mist cookie permision

adminRouter.get('/products/:page_count', async (req, res) => {
    let setPage = (req.params.page_count - 1) * 15; 
    let numberOfproduct = await db.query('SELECT COUNT(*) FROM products');

    if (numberOfproduct.rows[0].count > (setPage + 15)) {
        let listCurrentProduct = await db.query('SELECT * FROM products OFFSET $1 LIMIT 15', [setPage]);
        res.send(listCurrentProduct.rows)
        
    } else {
        console.log('agagg')
        setPage = 0
        let listCurrentProduct = await db.query('SELECT * FROM products OFFSET $1 LIMIT 15', [setPage])
        res.send(listCurrentProduct.rows)
    }
}) 









module.exports = adminRouter