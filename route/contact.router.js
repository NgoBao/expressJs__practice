var express = require('express')
var contactRouter = express.Router()

contactRouter.get('/', (req,res) => {
    res.render('pageContact', {})
})

module.exports = contactRouter