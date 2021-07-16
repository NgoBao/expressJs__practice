var express = require('express')
var contactRouter = express.Router()

contactRouter.get('/', (req,res) => {
    res.render('pageContact', {})
})

contactRouter.post('/', (res, req) => {
    console.log(res.body)
    //connect with database
    //save contact model
    //redirect to home page 
})

module.exports = contactRouter