const paginationArr = require('../middleWare/pagination.middleWare')
const productController = require('../controller/product.controller')
const createSession = require('../middleWare/create-session.middleWare')
var express = require('express')
var productRouter = express.Router()  

productRouter.get(
        '/:page_count', 
        createSession, 
        paginationArr, 
        productController.pageProduct
    )

productRouter.get(
        '/categorized/:product_type/:page_categorized_count', 
        createSession, 
        paginationArr, 
        productController.categorizedProduct
    )

productRouter.get(
        '/search/:page_search_count', 
        createSession, 
        paginationArr, 
        productController.seachProduct
    )

module.exports = productRouter
