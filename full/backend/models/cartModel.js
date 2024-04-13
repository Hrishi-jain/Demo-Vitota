const mongoose = require("mongoose");

const carttSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    cartItems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"cartItems",
        required:true
    }],

    totalPrice: {
        type: Number,
        required: true,
        default:0
    },

    totalItem: {
        type: Number,
        required: true,
        default:0
    },

    totalDiscountPrice: {
        type: Number,
        required: true,
        default:0
    },

    discounte: {
        type: Number,
        required: true,
        default:0
    },

    images: String,
    Description: String,
});


const  Cart =  mongoose.model("cart", carttSchema);
module.exports = Cart
