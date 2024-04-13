const express = require('express');
const { homepage, usersignout, usersignup, usersignin, currentuser, studentsendmail, sendotp,alluser, productupload, ratings, review, category, renderAllProducts } = require('../controllers/indexController');
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth")
const upload = require("../utils/multer")

// Import the product rendering controller function
const { renderProduct } = require('../controllers/indexController');



// Define the route for product rendering
// router.get('/product/:productId', renderProduct);




router.get('/', isAuthenticated, homepage)

// post /user/singup
router.post('/user/signup', usersignup)

router.post('/user/send-otp', sendotp)


router.post('/user/currentuser',isAuthenticated, currentuser)

router.post('/user/alluser', alluser)


// post /user/singup
router.post('/user/signin', usersignin)

// /user/singOut
router.get('/user/signout',isAuthenticated, usersignout)

router.post('/user/createcategory',isAuthenticated,upload.single("images"), category)

router.post('/user/uploadproduct',isAuthenticated,upload.single("images"), productupload)

router.get('/user/products', renderProduct)
router.get('/user/allProducts', renderAllProducts)


router.post('/user/rating',isAuthenticated, ratings)

router.post('/user/review',isAuthenticated, review)

// router.post('/user/uploadpost',isAuthenticated,upload.single("images"), postupload)


// student/send mail link

router.post("/user/send-mail", studentsendmail)



module.exports = router; 