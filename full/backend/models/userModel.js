const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "First name  should have required"],
    },

    phoneNumber: {
      type: String,
      unique: [true,],
      required: [true, "Contact  required  "],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      select: false,
    },

    role:{
      type:String,
      default:"CUSTOMER"
    },

    address:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"adresses"
    }],

    paymentInfo:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"paymentInfo"
    }],

    ratings:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"ratings"
    }],

    reviews:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"reviews"
    }],

    isAdmin: {
      type: String,
      default: false,
    },

    Products:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product"
    }],

    Queries:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Query"
    }]

    // OtpData:[{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:"otp"
    // }]
  },
  { timestamps: true }
);

UserSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return
  }
  let salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)

})

// password compare
UserSchema.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password)
};

// token genreted
UserSchema.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
