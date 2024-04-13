const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },

    review: {
        type:String
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }


});
const review = mongoose.model("reviews", reviewSchema);

module.exports = review
