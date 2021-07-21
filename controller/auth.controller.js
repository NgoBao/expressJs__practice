const { v4: uuid, v5: uuidPassword } = require('uuid');
const db = require('../db')

module.exports = {
    getRegister: (req, res) => {
        res.render('pageRegister', {
            err: req.query.errRegister
        })
    },

    postRegister: (req, res) => {


        if (req.body.registerErr.length > 0) { 
            res.send('false')
        } else {
            let user_id = uuid()
            let hash_password = uuidPassword(req.body.confirmPassword, process.env.SECRETPASSWORDKEY)
            
            db
                .query 
                    ('INSERT INTO users (user_id, first_name, last_name, phone_number, email, hash_password) VALUES ($1, $2, $3, $4, $5, $6)',
                        [
                            user_id,
                            req.body.userFirstName, 
                            req.body.userLastName,
                            req.body.userNumber,
                            req.body.userEmail, 
                            hash_password
                        ]
                    )
                .then(result => {
                    res.redirect("/account/login")
                })
                .catch(err => {
                    res.redirect("/account/register?errRegister=your email, phone number must be unique",)
                })
        }
    },

    getLogin: (req, res) => {
        
            res.render('pageLogin', {
                err: req.query.errLogin
            })
    },

    postLogin: async (req, res) => {
        if (req.body.userPassword == "" || req.body.userEmail == "") {
            res.send('false')
        }

        let hash_password = uuidPassword(req.body.userPassword, process.env.SECRETPASSWORDKEY)
        if (req.body.userEmail != "" && req.body.userPassword != "") {
            let user = await db.query('SELECT * FROM users WHERE email = $1', [req.body.userEmail])
            if (user.rows[0].hash_password === hash_password) {
                res
                    .cookie("user_id", user.rows[0].user_id, {
                        signed: true
                    })  
                    .redirect('/home')
            } else {
                res.redirect('/account/login?errLogin=Wrong password or your email not exists')
            }
        }
    },

    logout: (req, res) => {
        if (req.signedCookies.user_id) {
            res
                .clearCookie('user_id')
                .redirect('/home')
        } else {
            res.redirect('/home')
        }
    }
}