const errorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = {...err}
        
        error.message = err.message;

        // wrong mongoose object id error
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new errorHandler(message, 400);
        }

        // handling mongoose validation error   
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new errorHandler(message, 400);
        }

        // handling mongoose duplicate key error
        if (err.code == 11000) {
            const message = `The ${Object.keys(err.keyValue)} is already in use.`
            error = new errorHandler(message, 400);
        }

        // handling wrong JWT error
        if (err.name === 'JsonWebTokenError') {
            const message = 'JSON Web Token is invalid.'
            error = new errorHandler(message, 400);
        }

        // handling expired jwt error
        if (err.name === 'TokenExpiredError') {
            const message = 'JSON Web Token is expired.'
            error = new errorHandler(message, 400);
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}