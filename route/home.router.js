var express = require('express')
var homeRouter = express.Router()
const createSession = require('../middleWare/create-session.middleWare')
const homeController = require('../controller/home.controller')
homeRouter.get('/', createSession, homeController)

module.exports = homeRouter   