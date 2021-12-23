const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const createItemsController = require("../controllers/createItem");
const getItemsController = require("../controllers/getItems");
const getItemByIdController = require("../controllers/optional/getItemById");
const getItemsOfUserController = require("../controllers/getItemsOfUser");
const upload = require("../config/multer");


const router = express.Router();

router.route("/")
    .get(isAuthenticated, getItemsController)
    .post(isAuthenticated,  createItemsController)

router.route("/sell")
    .get(isAuthenticated,  getItemsOfUserController)

router.route("/:id")
    .get( isAuthenticated, getItemByIdController)

module.exports = router;