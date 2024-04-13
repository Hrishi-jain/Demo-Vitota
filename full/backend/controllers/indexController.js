const { catchError } = require("../middlewares/catchError")
const UserModel = require('../models/userModel')
const ProductModel = require('../models/productModel')
const categoryModel = require('../models/categoryModel')
const QueryModel = require("../models/QueryModel")
const otpModel = require("../models/otpModel")
const { Twilio } = require("twilio");
const reviewModel = require("../models/reviewModel")
const ratingModel = require("../models/ratingModel")


const ErrorHandler = require("../utils/ErrorHandler")
const { sendToken } = require("../utils/sendToken")
const upload = require("../utils/multer")
const { sendmail } = require("../utils/multer")

const client = new Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};





exports.homepage = catchError(async (req, res, next) => {
  res.json({ massage: 'homepage@!' })
})

exports.usersignup = catchError(async (req, res, next) => {
  const { phoneNumber, otp } = req.body;
  let otpDocument;

  if (otp) {
    // Verify OTP if userOTP is provided
    otpDocument = await otpModel.findOne({ phoneNumber, otp });

    if (!otpDocument) {
      // Invalid OTP
      return res.status(401).json({ success: false, error: "Invalid OTP" });
    }
  } else {
    // Generate OTP if userOTP is not provided
    const otp = generateOtp();

    // Save OTP along with user's phone number
    await otpModel.create({ phoneNumber, otp });

    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP for signup is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });

    // Retrieve OTP document for verification
    otpDocument = await otpModel.findOne({ phoneNumber, otp });
  }

  // Proceed with user creation if OTP is valid
  if (otpDocument) {
    const user = await new UserModel(req.body).save();
    sendToken(user, 201, res);
  } else {
    res.status(500).json({ success: false, error: "Failed to verify OTP" });
  }
});





// exports.usersignup = catchError(async (req, res, next) => {
//   const user = await new UserModel(req.body).save();
//   //  res.status(201).json(Users)
//   sendToken(user, 201, res)
// })

exports.usersignin = catchError(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email }).select("+password")
  if (!user) return next(new ErrorHandler("user not found with this email address", 404))
  const isMatch = user.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("wrong credential", 500))
  sendToken(user, 200, res)
})

exports.usersignout = catchError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: 'Sucessfully signOut ho gaye h0' })
})

exports.currentuser = catchError(async (req, res, next) => {
  const user = await UserModel.findById(req.id).exec()
  console.log(user);
  res.json({ user })
})

exports.alluser = catchError(async (req, res, next) => {
  const alluser = await UserModel.find().exec()
  res.json({ alluser })
})

// upload.single("post"),
exports.productupload = catchError(async (req, res, next) => {
  const user = await UserModel.findById(req.id).exec()
  if (!user) {
    return next(new ErrorHandler("user not found with this email address", 404))
  }
  const postData = await ProductModel.create({
    image: req.file.filename,
    price: req.body.price,
    user: user._id,
    Description: req.body.Description,
    title: req.body.title,
    discountedPrice: req.body.discountedPrice,
    discountepersent: req.body.discountepersent,
    quantity: req.body.quantity,
    brand: req.body.brand,
    ratings: req.body.ratings,
    reviews: req.body.reviews,
    numRatings: req.body.numRatings,
    category: req.body.categoryId 
  })
  user.Products.push(postData._id)
  await user.save()
  res.json(user)
})

exports.category = catchError(async (req, res, next) => {
  const { name } = req.body;
  const category = new categoryModel({ name });
  await category.save();
  res.status(201).json(category);
})

exports.ratings = catchError(async (req, res, next) => {
  const user = await UserModel.findById(req.id).exec();
  if (!user) {
    return next(new ErrorHandler("user not found with this email address", 404))
  }

  const { productId, rating: ratingValue } = req.body;

  // Creating a new rating document
  const ratingData = await ratingModel.create({
    user: user._id,
    product: productId,
    rating: ratingValue
  });

  // Pushing the created rating's id to the product's ratings array
  await ProductModel.findByIdAndUpdate(productId, { $push: { ratings: ratingData._id } });

  res.json(ratingData);
});

exports.review = catchError(async (req, res, next) => {
  const user = await UserModel.findById(req.id).exec();
  if (!user) {
    return next(new ErrorHandler("user not found with this email address", 404))
  }

  const { productId, review: reviewText } = req.body;

  // Creating a new rating document
  const reviewData = await reviewModel.create({
    user: user._id,
    product: productId,
    review: reviewText
  });

  // Pushing the created rating's id to the product's ratings array
  await ProductModel.findByIdAndUpdate(productId, { $push: { reviews: reviewData._id } });

  res.json(reviewData);
});



exports.studentsendmail = catchError(async function (req, res, next) {
  const student = await UserModel.findOne({ email: req.body.email }).exec()
  if (!student) return next(new ErrorHandler("user not found with this email address", 404))
  const url = "Thank you for your message. Your message has been received, and we will get back to you shortly"
  sendmail(req, res, next, url)
  await student.save()
  res.json({ student, url })
})


exports.sendotp = (async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
  const otp = generateOtp();

  await otpModel.create({ phoneNumber, otp });

  await client.messages.create({
    body: `LO BHAIYA TUMHARI OTP DIDI AA GAYI😂 ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber
  });

  res.json({ success: true, message: "OTP sent successfully",statusCode:200 });
  } catch (error) {
   console.log(error)
   res.json({error:error})
  }
})


// Define the product render API controller function
exports.renderProduct = catchError(async (req, res, next) => {
  try {
    // Retrieve product ID from request parameters
    const { productId } = req.query;
    console.log(req.query,"query")
    console.log("===",req.query.productId)
    
    // Find the product in the database by its ID
    const product = await ProductModel.findById(productId);


    if (!product) {
      return res.status(404).json({ success: false, error: "Product 123not found" });
    }

    const renderedProduct = {
      id: product._id,
      title: product.title,
      description: product.Description,
      price: product.price,
      discountedPrice: product.discountedPrice,
      category: product.category,
      image:product.image
    };
    
    // Return the rendered product data as the API response
    res.json({success: true, product: renderedProduct});
  } catch (error) {
    // Handle any errors that occur during product rendering
    console.error("Error rendering product:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

exports.renderAllProducts = catchError(async (req, res, next) => {
  try {
  
    const product = await ProductModel.find();


    if (!product) {
      return res.status(404).json({ success: false, error: "Product 123not found" });
    }

        res.json({success: true, product:product});
  } catch (error) {
    // Handle any errors that occur during product rendering
    console.error("Error rendering product:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});