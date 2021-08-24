const secure = require('./secureInfo')


module.exports = (req, res, next) => {
    let err = (() => {

        if (!req.body.userFirstName.length ||
            !req.body.userLastName.length ||
            !secure.checkEmail(req.body.userEmail)
        ) {
            return "Please fill enought information"
        }

        if (!secure.checkPhoneNumber(req.body.userNumber)) {
            return "Please give us ur right number"
        }

        if (
            req.body.currentPassword !== req.body.confirmPassword ||
            req.body.currentPassword.length < 8 ||
            req.body.confirmPassword.length < 8
        ) {
            return "Wrong confirm password or password-length > 8!"
        }

        return ""
    })()
    req.body.registerErr = err
    next()
}