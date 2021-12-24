const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
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
        type: String
    },
    created_at: {
        type: Date,
        required: true,
        immutable: false
    },
    purchased_at: {
        type: Date,
        default: ()=>Date.now(),
        required: true,
        immutable: false
    },
    seller: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true,
        immutable: false
    },
    buyer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true,
        immutable: false
    }
});

module.exports = mongoose.model("purchase", purchaseSchema); //creation of collection user in nbay db(create if not)