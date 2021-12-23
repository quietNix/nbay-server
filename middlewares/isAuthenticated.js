function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        req.body.user_id = req.user._conditions._id
        return next();
    }
    if (req.originalUrl === "/isAuthenticated") return res.send({ isAuthenticated: false })
    return res.status(400).send({isAuthenticated: false});
}

module.exports = isAuthenticated;