const paginationArr = require('../middleWare/pagination.middleWare')
const productController = require('../controller/product.controller')

var express = require('express')
var productRouter = express.Router() 

productRouter.get('/:page_count', paginationArr, productController.pageProduct)
productRouter.get('/categorized/:product_type/:page_categorized_count',async (req, res) => {
    res.send("oke")
})
productRouter.get('/search',async (req, res) => {
    res.send('oke')
})

module.exports = productRouter
