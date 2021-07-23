const { v4: uuid, v5: uuidPassword } = require('uuid');
const db = require('../db')

module.exports = {
    getAccount: async (req, res) => {
        let userInfo = await db.query("SELECT * FROM users WHERE user_id = $1", [req.signedCookies.user_id])

        res.render("pageAccountInfo", {
            firstName: userInfo.rows[0].first_name,
            lastName: userInfo.rows[0].last_name, 
            email: userInfo.rows[0].email,
            phone_number: userInfo.rows[0].phone_number,
            err: req.query.errAccountEdit,
        })  
    },

    getUpdateAccountPassword: (req, res) => {
        console.log(req.body)
        if (
            (req.body.currentPassword.length > 8) &&
            (req.body.newPassword.length > 8) &&
            (req.body.confirmNewPassword.length > 8) && 
            (req.body.newPassword === req.body.confirmNewPassword)
        ) {
            let new_hash_password = uuidPassword(req.body.newPassword, process.env.SECRETPASSWORDKEY) 
            let old_hash_password = uuidPassword(req.body.currentPassword, process.env.SECRETPASSWORDKEY)
            db
                .query(`UPDATE users SET hash_password = $1 WHERE user_id = $2 AND hash_password = ${old_hash_password}`,
                    [
                        new_hash_password, 
                        req.signedCookies.user_id,
                    ]
                )
                .then(result => {
                    console.log(result)
                    res.redirect('/home')
                })
                .catch(err => {
                    res.redirect('/account?errAccountEdit=Old password wrong')
                })
        }
    },

    getUpdateAccountInfo: async (req, res) => {
        let stateUpdateInfo = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            phone_number: req.body.phone
        }

        console.log(stateUpdateInfo)

        for (const key in stateUpdateInfo) {
            if (stateUpdateInfo[key].length === 0 || !stateUpdateInfo[key]) {
                delete stateUpdateInfo[key]
            } else { 
                await    db
                            .query(`UPDATE users SET ${key}=$1 WHERE user_id=$2`,
                            [
                                stateUpdateInfo[key],
                                req.signedCookies.user_id
                            ])
                            .then(result => {
                                res.redirect('/home')
                            })
                            .catch(err => {
                                res.redirect('/account?errAccountEdit=your information was wrong')
                            })
            }   
        }
    },

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