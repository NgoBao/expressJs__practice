const express = require('express')
const authRouter = express.Router()
const authController = require('../controller/auth.controller')
require('dotenv').config()

const checkUserCookie = require('../middleWare/authenticationAccount/check.userCookie')
const registerValidation = require('../middleWare/authenticationAccount/registerValidation.middleWare')

authRouter
    .get('/', checkUserCookie, authController.getAccount)

authRouter
    .post('/updatePassword', checkUserCookie, authController.getUpdateAccountPassword)

authRouter
    .post('/updateInfo', checkUserCookie, authController.getUpdateAccountInfo)

authRouter
    .get('/register', authController.getRegister)
    .post('/register', registerValidation,  authController.postRegister)

authRouter
    .get('/login', authController.getLogin)
    .post('/login', authController.postLogin)

authRouter
    .get('/logout', authController.logout)


module.exports = authRouter