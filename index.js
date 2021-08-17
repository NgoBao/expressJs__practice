require('dotenv').config()
const express = require('express')

const app = express()


const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const port = process.env.PORT

const pageError = require('./middleWare/pageError.middleWare')
const adminRouter = require('./route/admin.router')
const aboutRouter = require('./route/about.router')
const contactRouter = require('./route/contact.router')
const homeRouter = require('./route/home.router')
const authRouter = require('./route/auth.router')
const productRouter = require('./route/product.router')




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser(process.env.SECRETCOOKIE))


app.use(express.static('public'))
app.set('view engine', 'pug')


// test   
app.get('/', (req, res) => {
        res.send(req.signedCookies.user_id)
    })
    //admin page
app.use('/admin', adminRouter)
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

//fix error auth with number
//fix error auth with email