const db = require('../db')

module.exports = {
    getContact: (req, res) => {
        res.render('pageContact', {
            err: req.query.errContact
        })
    },

    postContact: (res, req) => {
        if (
            !req.body.userFirstName.length      ||
            !req.body.userLastName.length       ||
            !req.body.userEmail.length          ||
            !req.body.meetingPurposes.length    ||
            !req.body.message.length            
        ) {
            res.redirect(`/contact?errContact=please send right information`)
        } 

        if (!req.body.phone.length !== 10) {
            res.redirect(`/contact?errContact=please send right information`)
        }

        db  
            .query('INSERT INTO contacts (session_id , first_name , last_name , phone_number , email , message , target) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [
                    req.signedCookie.session_id,
                    req.body.userFirstName,
                    req.body.userLastName,
                    req.body.phone,
                    req.body.userEmail,
                    req.body.message,
                    req.body.meetingPurposes
                ]
            )
            .then(result => {
                res.redirect('/home')
            })
            .catch(err => {
                res.redirect('/contact?errContact=some thing wrong with your info')
            })

    }


}