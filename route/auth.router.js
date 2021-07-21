const express = require('express')
const authRouter = express.Router()
const authController = require('../controller/auth.controller')
require('dotenv').config()

const registerValidation = require('../middleWare/authenticationAccount/registerValidation.middleWare')

authRouter
    .get('/register', authController.getRegister)
    .post('/register', registerValidation,  authController.postRegister)

authRouter
    .get('/login', authController.getLogin)
    .post('/login', authController.postLogin)

authRouter
    .get('/logout', (req, res) => {
        if (req.signedCookies.user_id) {
            res
                .clearCookie('user_id')
                .redirect('/home')
        } else {
            res.redirect('/home')
        }
    })


module.exports = authRouter