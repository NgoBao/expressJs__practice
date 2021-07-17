const e = require('express')
const db = require('../db')


module.exports = async (req, res, next) => {
    let numberOfproduct = await db.query('SELECT COUNT(*) FROM products')
    let maxPages = Math.round(parseInt(numberOfproduct.rows[0].count)/15) + 1
    let state = {
        page: req.params.page_count,
        display: 3,
        arrDisplay: []
    }

    let maxLeft = state.page - Math.floor(state.display / 2)
    let maxRight = state.page + Math.floor(state.display / 2)

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

    req.arrPagination = state.arrDisplay
    next()
}

