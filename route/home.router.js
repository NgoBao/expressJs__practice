var express = require('express')
var homeRouter = express.Router()

homeRouter.get('/', (req, res) => {
    res.render('pageHome', {})
})

module.exports = homeRouter   