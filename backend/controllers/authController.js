const User = require('../models/user');

const errorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

// register a user => /api/v1/register
exports.registerUser = catchAsyncError( async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatar/starwars',
            url: 'https://images.pexels.com/photos/3526022/pexels-photo-3526022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
    });

    sendToken(user, 200, res)

})

// login user => /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // check if email and password is entered
    if (!email || !password) {
        return next(new errorHandler('Please enter email and password', 400))
    }

    // finding user if existing in the DB
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new errorHandler('Invalid Email or Password', 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new errorHandler('Invalid Email or Password', 401))
    }

    sendToken(user, 200, res)

})


// logout user => /api/v1/logout

exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        status:'success',
        message: 'Successfully logged out.'
    })
})
