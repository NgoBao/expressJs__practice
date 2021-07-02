module.exports = (req, res) => {
    res.status(404)

    // respond with html page
    if (req.accepts('html')) {
        res.render('page404', { url: req.url });
        return
    }

    // respond with json
    if (req.accepts('json')) {
        res.json({ error: "Not found"})
        return
    }

    res.type('txt').send("Not Found")
}