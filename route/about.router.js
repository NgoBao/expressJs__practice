var express = require('express')
var aboutRouter = express.Router()
const createSession = require('../middleWare/create-session.middleWare')
const aboutController = require('../controller/about.controller')

aboutRouter.get('/', createSession, aboutController)

module.exports = aboutRouter