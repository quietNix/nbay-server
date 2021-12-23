const mongoose = require("mongoose");

const items = require("../models/items");
const purchases = require("../models/purchases");


const purchase = async (req, res, next) => {
    const { item_id, user_id } = req.body;
    const session = await mongoose.startSession();
    try {
        const item = await items.findOne({ _id: item_id });
        if(user_id===item.seller) res.status(402).send("User can't buy its own product");
        
        session.startTransaction();
        const newPurchase = await purchases.create([{
            name: item.name,
            category: item.category,
            price: item.price,
            created_at: item.created_at,
            seller: item.seller,
            buyer: user_id
        }], { session: session });
        await items.deleteOne({ _id: item_id }).session(session);
        await session.commitTransaction();
        session.endSession();
        res.status(201).send({purchaseSuccess: true});
    } catch (e) {
        await session.abortTransaction();
        session.endSession();
        console.log(e.message);
        res.status(502).send("Try Again");
    }
}

module.exports = purchase;