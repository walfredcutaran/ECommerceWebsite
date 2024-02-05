const User = require('../models/user');
const jwt = require('jsonwebtoken')
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors ( async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return next(new errorHandler('Login first to access the resource.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
})

// handling user roles
exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
            new errorHandler(`Role (${req.user.role}) is not allowed to access this resource.`, 403))  
        }

        next();
    }
}