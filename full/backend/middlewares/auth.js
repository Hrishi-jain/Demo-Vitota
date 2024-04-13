const jwt = require('jsonwebtoken');
const ErrorHandler = require("../utils/ErrorHandler");
const { catchError } = require("./catchError")
exports.isAuthenticated = catchError(async (req, res, next) => {
  // const { token } = req.cookies; || req.headers.authorization
  let token;

  // Check if token exists in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Check if token exists in authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorHandler("please login in to access the resource"), 401)
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET)
  req.id = id;
  next();
})
