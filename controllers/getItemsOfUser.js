const items = require("../models/items");
const purchases = require("../models/purchases");
const mongoose = require("mongoose");

const getItemsOfUser = async (req, res, next) => {
    const { user_id } = req.body;
    try {
        const userItems = await items.find({ seller: await mongoose.Types.ObjectId(user_id) }, {seller: 0, photo:0}).sort({created_at: -1});
        const soldUsersItems = await purchases.find({ seller: await mongoose.Types.ObjectId(user_id) }).populate( "buyer").sort({ created_at: -1 });
        res.status(201).send({ userItems: userItems, soldUsersItems: soldUsersItems});
    } catch (e) {
        console.log(e.message);
        res.status(502).send("Try Again");
    }
}

module.exports = getItemsOfUser;