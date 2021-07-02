const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const port = 3000

const pageError = require('./middleWare/pageError.middleWare')



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/static", express.static("public"))
app.set('view engine', 'pug')




app.get("/", (req, res) => {
    res.send("hellow pro")
})

app.use(pageError)

app.listen(port, (req, res) => {
    console.log(`app is running on port ${port}`);
})  