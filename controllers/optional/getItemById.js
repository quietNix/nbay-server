const items = require("../../models/items");

const getItemById = async (req, res, next) => {
    const {user_id} = req.body;
    const {id} = req.params;
    try {
        const item = await items.findOne({_id: id}).populate("seller");

        const customItem= {
            _id: item._id,
            name: item.name,
            category: item.category,
            price: item.price,
            created_at: item.created_at,
            seller: item.seller.name,
            ownerSelf: item.seller._id.toString() === user_id
        }
        res.status(201).send( customItem );
    } catch (e) {
        console.log(e.message);
        res.status(502).send("Try Again");
    }
}

module.exports = getItemById;