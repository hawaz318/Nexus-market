// This function catches all errors and sends a professional JSON response
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Advanced: Detailed errors for development, simple errors for production
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production mode: Don't leak technical details to the user
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message || 'Something went wrong!'
    });
  }
};