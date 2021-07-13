var express = require('express')
var productRouter = express.Router()

productRouter.get('/', (req, res) => {
    res.render('pageProduct', {})
})

module.exports = productRouter