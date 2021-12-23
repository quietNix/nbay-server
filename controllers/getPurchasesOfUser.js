const purchases = require("../models/purchases");
const mongoose = require("mongoose");

const getPurchasesOfUser = async (req, res, next) => {
    const { user_id } = req.body;
    try {
        const purchasesOfUser = await purchases.find({ buyer: await mongoose.Types.ObjectId(user_id) }, { buyer: 0 }).populate("seller").sort({purchased_at: -1});
        res.status(201).send({purchases: purchasesOfUser});
    } catch (e) {
        console.log(e.message);
        res.status(502).send("Try Again");
    }
}

module.exports = getPurchasesOfUser;