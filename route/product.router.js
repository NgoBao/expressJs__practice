const paginationArr = require('../middleWare/pagination.middleWare')
const productController = require('../controller/product.controller')

var express = require('express')
var productRouter = express.Router()  

productRouter.get('/:page_count', paginationArr, productController.pageProduct)
productRouter.get('/categorized/:product_type/:page_categorized_count', paginationArr, productController.categorizedProduct)
productController.get('/search/:page_search_count', paginationArr, productController.seachProduct)

module.exports = productRouter
