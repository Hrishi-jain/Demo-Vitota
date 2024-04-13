const mongoose = require("mongoose");

const QueryDetail = new mongoose.Schema({
  Queryemail: {
    type: String
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  name: {
    type: String,
    required: true,
  },
  message: String,
});
module.exports = mongoose.model("Query", QueryDetail);
