var express = require('express')
var aboutRouter = express.Router()

aboutRouter.get('/', (req,res) => {
    res.render('pageAbout', {})
})

module.exports = aboutRouter