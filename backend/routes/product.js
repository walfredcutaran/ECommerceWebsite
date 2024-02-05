const express = require('express')
const router = express.Router();

const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth')

// get all product INFORMATION
router.route('/products').get(getProducts);

// get single product INFORMATION
router.route('/product/:id').get(getSingleProduct);

// create, update and delete PRODUCT
router.route('/admin/product/new').post(isAuthenticatedUser, authorizedRoles('admin'), newProduct);
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProduct);


module.exports = router;