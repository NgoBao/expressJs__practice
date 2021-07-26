const db = require('../db')
const { v4: uuid } = require("uuid");


module.exports = {
    pageProduct: async (req, res) => {
        let setPage = (req.params.page_count - 1) * 15; 
        let numberOfproduct = await db.query('SELECT COUNT(*) FROM products');
        let stateCategory = {
            all: "active",
            commercial: "",
            shop: "",
            blog: "",
            app: "",
            system: ""
        }

        if (numberOfproduct.rows[0].count  - (setPage + 15) <= -15) {
            setPage = 0
        } 

        let listCurrentProduct = await db.query('SELECT * FROM products OFFSET $1 LIMIT 15', [setPage])

        res.render('pageProduct', {
            products: listCurrentProduct.rows,
            arrPagination: {
                arrUrl: req.arrPagination.arrUrl,
                arrNumber: req.arrPagination.arrNumber
            },
            type: stateCategory
        })
        
    },

    categorizedProduct: async (req, res) => {
        let typedProductsCount = await db.query('SELECT COUNT(*) FROM products WHERE type = $1', [req.params.product_type])
        let setPage = (req.params.page_categorized_count - 1) * 15;
        let stateCategory = {
            all: "",
            commercial: "",
            shop: "", 
            blog: "",
            app: "",
            system: ""
        }
    
        if (typedProductsCount.rows[0].count - (setPage + 15) <= -15) {
    
            setPage = 0
        } 
        
            
        let typedProducts = await db.query('SELECT * FROM products WHERE type = $1 OFFSET $2 LIMIT 15', [req.params.product_type, setPage])
    
        stateCategory[req.params.product_type] = "active"
        res.render('pageProduct', {
            products: typedProducts.rows,
            arrPagination: {
                arrUrl: req.arrPagination.arrUrl,
                arrNumber: req.arrPagination.arrNumber
            },
            type: stateCategory
        })
    
    },

    seachProduct: async (req, res) => {
        if (!req.query.product_title) {
            res.redirect('/product/1')
        } 
    
        let stateCategory = {
            all: "",
            commercial: "",
            shop: "", 
            blog: "",
            app: "",
            system: ""
        }
    
        let listProduct = await db.query("SELECT * FROM products")
        let rows = listProduct.rows.filter(ele => {
            return ele.title.indexOf(req.query.product_title) != -1
        })
        let setPage = (req.params.page_search_count - 1) * 15
        
        if (rows.length - (setPage + 15) <= -15) {
            setPage = 0
        } // error
    
        console.log(rows.slice(setPage, setPage + 15))
        res.render('pageProduct', {
            products: rows.slice(setPage, setPage + 15),
            arrPagination: {
                arrUrl: req.arrPagination.arrUrl,
                arrNumber: req.arrPagination.arrNumber
            },
            type: stateCategory
        })
    },

    productItem: (req, res) => {
        db
            .query("SELECT * FROM products WHERE product_id = $1", [req.params.productItemId])
            .then(result => {
                res.render("productItem", {
                    product: result.rows[0]
                })
            })
            .catch(err => {
                console.log(err)
            })
    },

    addCart: (req, res) => {
        if (!req.signedCookies.user_id) {
            res.redirect("/account/login")
        }  else {
            db
            .query("INSERT INTO carts (cart_id, user_id, product_id) VALUES ($1, $2, $3)", 
            [
                uuid(),
                req.signedCookies.user_id,
                req.params.product_id
            ])
            .then(result => {
                res.redirect('/product/1')
            })
            .catch(err => {
                res.redirect(`/product/access/${req.params.product_id}`)
            })
        } 
    },

}