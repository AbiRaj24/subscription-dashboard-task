export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.details.map((detail) => detail.message),
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};