const { parse } = require('dotenv')
const db = require('../db')


module.exports = async (req, res, next) => {
    let
        numberOfproduct, 
        maxLeft, 
        maxRight, 
        maxPages,
        state = {
            page: req.params.page_categorized_count || req.params.page_count || req.params.page_search_count,
            display: 3,
            arrDisplay: [],
            arrUrl: []
        }

    // calc number of product db had

    if (req.params.product_type) {
        numberOfproduct = await db.query('SELECT COUNT(*) FROM products WHERE type = $1', [req.params.product_type])
    } else {
        numberOfproduct = await db.query('SELECT COUNT(*) FROM products')
    }

    // set limit, capacity of pagination  


    if (req.params.page_search_count) {
        let listProduct = await db.query("SELECT * FROM products")
        numberOfproduct = listProduct.rows.filter(ele => {
            return ele.title.indexOf(req.query.product_title) != -1
        })
        maxPages = Math.floor(numberOfproduct.length/15 + 14/15)
    } else {
        maxPages = Math.round(parseInt(numberOfproduct.rows[0].count)/15) + 1 
    }

    maxLeft = parseInt(state.page) - Math.floor(state.display / 2)
    maxRight = parseInt(state.page) + Math.floor(state.display / 2)


    //handle every special case with pagination

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.display
    }

    if (maxRight > maxPages) {
        maxRight = maxPages
        maxLeft = maxPages - (state.display - 1)

        if (maxLeft < 1) {
            maxLeft = 1
        }
    }

    for (var i = maxLeft; i <= maxRight; i++) {
        state.arrDisplay.push(i)
    }

    //handle arr when have categorized
    if (req.params.page_categorized_count) {
        state.arrDisplay.forEach((element) => {
            state.arrUrl.push('categorized/' + req.params.product_type + "/" + String(element))
        })
    } else if (req.params.page_search_count) {
        state.arrDisplay.forEach(element => {
            state.arrUrl.push('search/' + String(element)  + `?product_title=${req.query.product_title}`)
        })
    } else {
        state.arrDisplay.forEach(element => {
            state.arrUrl.push(String(element))
        })
    }

    req.arrPagination = {
        arrUrl: state.arrUrl,
        arrNumber: state.arrDisplay
    }
    next()
}

