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
        let hash_password = uuidPassword(req.body.confirmPassword, process.env.SECRETPASSWORDKEY)
        
        let err = (() => {
            if (!$('#userFirstName').val().length || !$("#userLirstName").val().length || !$("#userEmail").val().length) {
                return "Please fill enought information"
            }
            if ($('#userNumber').val().length !== 10) {
                return "Please give us ur right number"
            }
            if ($('#currentPassword').val() !== $('#confirmPassword').val() || $('#currentPassword').val().length < 8 || $('#confirmPassword').val().length < 8) {
                return "Wrong confirm password or password-length > 8!"
            }
            if (!$('#termAgree').prop('checked')) {
                return "U need to agree with our term to register"
            }
        })()

        if (err.length) {
            res.send('false')
        } else {
            db   
            .query
                ('INSERT INTO users (user_id, first_name, last_name, phone_number, email, hash_password) VALUES ($1, $2, $3, $4, $5, $6)',
                    [
                        user_id, 
                        req.body.userFirstName, 
                        req.body.userLastName,
                        req.body.userNumber, 
                        req.body.userEmail, 
                        hash_password
                    ]
                )
            .then(result => {
                res.send("true")
                // if success will redirect to login account
            })
            .catch(result => { 
                console.log(result)
                res.send(result)
            })
        }

        
    })

authRouter.get('/login', (req, res) => {
    res.render('pageLogin', {}) 
})

// post login with 
// post sign up then login


module.exports = authRouter