const mongoose = require("mongoose");

const categoryShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength:50,
        unique: true
    },

    // parentCategory:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"categories"
    // },

});


const category = mongoose.model("categories", categoryShema);
module.exports = category
