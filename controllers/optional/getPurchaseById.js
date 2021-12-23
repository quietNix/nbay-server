const purchases = require("../../models/purchases");

const getItemById = async (req, res, next) => {
    const {id} = req.params;
    try {
        const purchase = await purchases.findOne({_id: id}).populate("seller");
        
        const customItem= {
            _id: purchase._id,
            name: purchase.name,
            category: purchase.category,
            created_at: purchase.created_at,
            purchased_at: purchase.purchased_at,
            price: purchase.price,
            seller: purchase.seller.name
        }
        console.log(purchase);
        res.status(201).send( customItem );
    } catch (e) {
        console.log(e.message);
        res.status(502).send("Try Again");
    }
}

module.exports = getItemById;