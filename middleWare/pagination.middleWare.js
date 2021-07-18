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
            arrDisplay: []
        }

    // calc number of product db had

    if (req.params.product_type) {
        numberOfproduct = await db.query('SELECT COUNT(*) FROM products WHERE type = $1', [req.params.product_type])
    } else {
        numberOfproduct = await db.query('SELECT COUNT(*) FROM products')
    }

    // set limit, capacity of pagination
    
    if (req.params.page_search_count) {
        let listProduct = await db.query("SELECT * FROM product")
        numberOfproduct = listProduct.rows.filter(ele => {
            return ele.title.indexOf(req.query.product_title) != -1
        })
    }

    maxPages = Math.round(parseInt(numberOfproduct.rows[0].count)/15) + 1

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
        for (let index = 0; index < state.arrDisplay.length; index++) {
            state.arrDisplay[index] = 'categorized/' + req.params.product_type + "/" + String(state.arrDisplay[index])
        }

    } else {
        console
        for (let index = 0; index < state.arrDisplay.length; index++) {
            state.arrDisplay[index] = String(state.arrDisplay[index])
        }
    }

    req.arrPagination = state.arrDisplay 
    next()
}

