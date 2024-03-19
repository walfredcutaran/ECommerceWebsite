const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookieParser());

// import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');

app.use('/api/v1', products)
app.use('/api/v1', auth)

// if (process.env.NODE_ENV == 'PRODUCTION') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
//     })
// }

// middleware to handle errors
app.use(errorMiddleware);

module.exports = app;