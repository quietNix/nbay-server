const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    created_at: {
        type: Date,
        default: () => Date.now(),
        required: true,
        immutable: false
    },
    seller: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true,
        immutable: false
    }
});

module.exports = mongoose.model("item", itemSchema); //creation of collection user in nbay db(create if not)