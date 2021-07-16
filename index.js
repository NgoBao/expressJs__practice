require('dotenv').config()
const express = require('express')

const app = express()


const bodyParser = require('body-parser')
const db = require('./db')
const port = 3000

const pageError = require('./middleWare/pageError.middleWare')
const aboutRouter = require('./route/about.router')
const contactRouter = require('./route/contact.router')
const homeRouter = require('./route/home.router')
const authRouter = require('./route/auth.router')
const productRouter = require('./route/product.router')
const pageErrorMiddleWare = require('./middleWare/pageError.middleWare')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.set('view engine', 'pug')


// test
app.get('/', (req, res) => {
    res.send("ngo chi bao")
})     
//home page route
app.use('/home', homeRouter)
//about page route
app.use('/about', aboutRouter)
//contact page route
app.use('/contact', contactRouter)
//product page route
app.use('/product', productRouter)
//acount route
app.use('/account', authRouter)


app.use(pageError)

app.listen(port, (req, res) => {
    console.log(`app is running on port ${port}`);
})  