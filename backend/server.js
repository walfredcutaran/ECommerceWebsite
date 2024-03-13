const app = require('./app');
const connectDatabase = require('./config/database');

// const dotenv = require('dotenv');

// handle uncaught exceptions
process.on('uncaughtException', error => {
    console.log(`ERROR: ${error.message}`);
    console.log('Shutting down server due to Uncaught Exception.');
    process.exit(1);
})

// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').dotenv.config({path: 'backend/config/config.env'});
}


// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
}) 

// handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down server due to Unhandled Promise Rejection.');
    server.close(() => {
        process.exit(1);
    });
    
})