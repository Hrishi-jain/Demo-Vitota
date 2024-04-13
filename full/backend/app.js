require("dotenv").config({path: "./.env"})
const express = require('express');
const app = express();
const cors = require('cors')

// connectDatabase
require("./models/database").connectDatabase();

// logger help to  which route to you hit
const logger = require('morgan');
app.use(logger("tiny"))


const corss ={
  origin:"http://localhost:5173",
  Credential:true
}

app.use(cors(corss));
// body-parser use to activate req.body
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// session and cookie
const  session = require("express-session");
const cookieparser = require("cookie-parser");

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.EXPRESS_SESSION_SECERT

}))

// Import the product router
const productRouter = require('./routes/indexRoutes');

// Mount the product router
app.use('/api', productRouter);


app.use(cookieparser());
//routes
app.use('/', require("./routes/indexRoutes"))


// golbal error
const ErrorHandler = require("./utils/ErrorHandler");
const { genetatedErrors } = require("./middlewares/errors");


// Error Handling

app.all("*", (req,res,next) => {
  next(new ErrorHandler(`Requisted Url Not Found ${req.url}`), 404 )
});

app.use(genetatedErrors)

app.listen(process.env.PORT || 5000,
  console.log(`Hrishi's server runing port ${process.env.PORT} `)
  )