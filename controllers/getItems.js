const items = require("../models/items");

const getItems=async(req, res, next)=>{
    let pageCount=0
    let {user_id} = req.body;
    try {
        const itemsList = await items.find({}).sort({created_at: -1}).skip(50*pageCount).populate("seller").limit(50)
        res.status(201).send({user_id: user_id, items: itemsList});
    } catch (e) {
        console.log(e.message);
        res.status(502).send("Try Again");
    }
}

module.exports = getItems;