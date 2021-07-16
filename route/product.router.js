var express = require('express')
var productRouter = express.Router()

productRouter.get('/', (req, res) => {
    res.render('pageProduct', {})
})

// productRouter.post('/createProduct', (req, res) => {
//     //need Be client cookie to access
// })

// productRouter.post('/deleteProduct', (req, res) => {
//     //need Be client cookie to access
// })



module.exports = productRouter
