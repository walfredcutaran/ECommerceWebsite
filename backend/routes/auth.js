const express = require('express');
const router = express.Router();

const { registerUser, 
        loginUser, 
        forgotPassword, 
        resetPassword, 
        updatePassword,
        getUserProfile,
        logoutUser,
} = require('../controllers/authController');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
 
module.exports = router;