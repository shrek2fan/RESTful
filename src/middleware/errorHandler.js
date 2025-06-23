const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const response = {
    error: err.message || 'Internal Server Error'
  };
  if (err.details) {
    response.details = err.details;
  }
  res.status(status).json(response);
};

module.exports = errorHandler;
