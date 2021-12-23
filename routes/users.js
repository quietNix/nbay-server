const express = require("express");
const router = express.Router();
const users = require("../models/users");
const bcrypt = require("bcrypt");
const createUserController = require("../controllers/createUser");

router.route("/")
    .post(createUserController)



module.exports = router;