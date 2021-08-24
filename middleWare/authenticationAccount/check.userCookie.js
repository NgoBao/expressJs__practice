module.exports = (req, res, next) => {
    if (req.signedCookies.user_id) {
        next()
    } else {
        res.redirect('/account/login')
    }
}