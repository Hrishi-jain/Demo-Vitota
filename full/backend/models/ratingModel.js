const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },

    rating: {
        type:Number
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }


});
const rating = mongoose.model("ratings", ratingSchema);

module.exports = rating
