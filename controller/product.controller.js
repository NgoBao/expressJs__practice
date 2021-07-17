const db = require('../db')

module.exports = {
    pageProduct: async (req, res) => {
        let setPage = (req.params.page_count - 1) * 15; 
        let numberOfproduct = await db.query('SELECT COUNT(*) FROM products');
        console.log(req.arrPagination)

        if (numberOfproduct.rows[0].count  - (setPage + 15) >= -15) {
            let listCurrentProduct = await db.query('SELECT * FROM products OFFSET $1 LIMIT 15', [setPage])
            
            res.render('pageProduct', { 
                products: listCurrentProduct.rows,
                arrPagination: req.arrPagination 
            }) 
            
        } else {
            setPage = 0
            let listCurrentProduct = await db.query('SELECT * FROM products OFFSET $1 LIMIT 15', [setPage])
            res.render('pageProduct', {
                products: listCurrentProduct.rows,
                arrPagination: req.arrPagination
            })
        }
    },

    seachProduct: async (req, res) => {
        
    },

    categorizedProduct: async (req, res) => {

    }
}