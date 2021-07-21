var express = require('express')
var contactRouter = express.Router()
const createSession = require('../middleWare/create-session.middleWare')
const contactController = require('../controller/contact.controller')

contactRouter
    .get('/', createSession, contactController.getContact)
    .post('/', createSession, contactController.postContact)

module.exports = contactRouter  