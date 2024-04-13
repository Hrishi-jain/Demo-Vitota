const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    streetAdd: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    zipCode: {
        type: Number,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

const addressmodel = mongoose.model("adresses", addressSchema);
module.exports = addressmodel;
