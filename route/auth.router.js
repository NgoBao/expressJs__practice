const express = require('express')
const authRouter = express.Router()
const { v4: uuid, v5 : uuidPassword } = require('uuid'); 
const db = require('../db')
require('dotenv').config()

authRouter
    .get('/register', (req, res) => {
        res.render('pageRegister', {})
    })
    .post('/register', (req, res) => {
        let user_id = uuid()
        let hash_password = uuidPassword(req.body.password, process.env.SECRETPASSWORDKEY)
        
        db   
            .query
                ('INSERT INTO users (user_id, first_name, last_name, phone_number, email, hash_password) VALUES ($1, $2, $3, $4, $5)',
                    [
                        user_id, 
                        req.body.first_name, 
                        req.body.last_name,
                        req.body.phone_number, 
                        req.body.email, 
                        hash_password
                    ]
                )
            .then(result => {
                res.send("true")
                // if success will redirect to login account
            })
            .catch(result => {
                // if error render agiain get-register page with arrer 
                res.send("false")
            })
    })

authRouter.get('/login', (req, res) => {
    res.render('pageLogin', {}) 
})

// post login with 
// post sign up then login


module.exports = authRouter