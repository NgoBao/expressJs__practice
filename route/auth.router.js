var express = require('express')
var authRouter = express.Router()

authRouter.get('/register', (req,res) => {
    res.render('pageRegister', {})
})

authRouter.get('/login', (req, res) => {
    res.render('pageLogin', {})
})

// post login with 
// post sign up then login


module.exports = authRouter