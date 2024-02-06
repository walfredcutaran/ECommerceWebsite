const User = require('../models/user');

const errorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

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

// * forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email});
    
    if (!user) {
        return next(new errorHandler('User not found', 404))
    }

    // * get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // * create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follows: \n\n${resetUrl}\n\n If you have not requested this changes then please ignore this email.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'E-Commerce Website Account Password Reset',
            message
        })

        res.status(200).json({
            status:'success',
            message: `An email has been sent to your account with email: ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        return next(new errorHandler(error.message, 500));
    }

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
