const items = require("../models/items");
const mongoose = require("mongoose");

const getItems = async (req, res, next) => {

    const { name, category, price, photo, user_id } = req.body;
    try {
        const newItem = await items.create({
            name: name,
            category: category,
            price: price,
            // img: {
            //     data: fs.readFileSync(photo.filename),
            //     contentType: photo.mimetype
            // },
            seller: await mongoose.Types.ObjectId(user_id)
        })
        res.status(201).send({
            itemCreated: {
                _id: newItem._id,
                name: newItem.name,
                category: newItem.category,
                price: newItem.price,
                // photo: newItem.photo,
                created_at: newItem.created_at
            }});
    } catch (e) {
        console.log(e.message);
        res.status(502).send("Try Again");
    }
}

module.exports = getItems;