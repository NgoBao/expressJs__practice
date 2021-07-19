require('dotenv').config()
const { v5 : uuidPassword } = require('uuid')

let secretKey = process.env.SECRETPASSWORDKEY

console.log(uuidPassword("ngobao2003", secretKey))