// backend/middleware/errorMiddleware.js

// General error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Log the error stack for debugging (you can enhance this with a logger)
  
    // Check the type of error and send an appropriate response
    if (err.name === 'ValidationError') {
      // Validation error, typically from mongoose or input validation
      return res.status(400).json({
        message: 'Validation Error',
        errors: err.errors,
      });
    } else if (err.name === 'JsonWebTokenError') {
      // Invalid or expired JWT error
      return res.status(401).json({
        message: 'Unauthorized - Invalid Token',
      });
    } else if (err.name === 'TokenExpiredError') {
      // Expired JWT error
      return res.status(401).json({
        message: 'Unauthorized - Token Expired',
      });
    } else if (err.status === 404) {
      // Resource not found (you can use this for custom error handling)
      return res.status(404).json({
        message: 'Resource Not Found',
      });
    } else {
      // Generic server error
      return res.status(500).json({
        message: 'Server Error',
        details: err.message,
      });
    }
  };
  
  module.exports = errorHandler;
  