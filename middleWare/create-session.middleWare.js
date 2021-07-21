const { v4: uuidv4 } = require('uuid')

module.exports = (req, res, next) => {
    if (!req.signedCookies.session_id) {
        res.cookie("session_id" , uuidv4(), { signed: true })
    }
    next()
}