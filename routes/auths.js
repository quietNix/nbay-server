const express = require("express");
const router = express.Router();
const passport = require("passport");
const users = require("../models/users");
const isAuthenticated = require("../middlewares/isAuthenticated");

const initializePassport = require("../config/passport");

initializePassport(
    passport,
    email => users.findOne({ email: email }),
    id => users.findOne({ _id: id })
)

router.post('/login', passport.authenticate('local', {
}), function (req, res) {
    res.status(201).send({ loggedIn: true });
})

router.get("/isAuthenticated", isAuthenticated, (req, res)=>{
    res.status(201).send({ isAuthenticated: true });
})

router.get("/logout", (req, res) => {
    req.logOut();
    res.status(201).send({ isLoggedOut: true});
})

module.exports = router;