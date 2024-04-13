const mongoose = require("mongoose");


const otpSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    }
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
});

const otpmodel = mongoose.model("otp", otpSchema);
module.exports = otpmodel;
