// * schema
const Product = require('../models/product');

const errorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// * create new Product => /api/v1/product/new
exports.newProduct = catchAsyncError (async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// * get all products => /api/v1/products?keyword=''
// * /api/v1/products?keyword=Wireless&price[gte]=100&price[lte]=200
exports.getProducts = catchAsyncError (async (req, res, next) => {

    const resPerPage = 8;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage) 

    const products = await apiFeatures.query;

    
        res.status(200).json({
            success: true,
            productCount,
            products
        })
    

})

// * get single product details => /api/v1/products/:id
exports.getSingleProduct = catchAsyncError (async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new errorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Product successfully found',
        product
    })
})

// * update product details => /api/v1/product/:id
exports.updateProduct = catchAsyncError (async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new errorHandler('Product not found', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    }); 

    res.status(200).json({
        success: true,
        message: 'Product successfully updated',
        product
    })
})

// * delete product => /api/v1/product/:id
exports.deleteProduct = catchAsyncError (async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new errorHandler('Product not found', 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Product successfully deleted'
    })

})


