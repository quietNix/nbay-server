const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const getPurchasesOfUser = require("../controllers/getPurchasesOfUser");
const getPurchaseById = require("../controllers/optional/getPurchaseById");
const purchaseTransaction = require("../transactions/purchase");

const router = express.Router();

router.route("/")
    .get(isAuthenticated, getPurchasesOfUser)
    .post(isAuthenticated, purchaseTransaction)

router.route("/:id")
    .get(isAuthenticated, getPurchaseById)

module.exports = router;