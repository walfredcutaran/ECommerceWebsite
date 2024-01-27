const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/product');

// seeting dotenv file
dotenv.config({path: 'backend/config/config.env'});

connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Product(s) deleted successfully');

        await Product.insertMany(products);
        console.log('Product(s) inserted successfully');

        process.exit(); 

    } catch (err) {
        console.log(err.message);
        process.exit();
    }
}

seedProducts();