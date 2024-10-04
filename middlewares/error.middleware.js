const ErrorMiddleware = (err, req, res, next) => {
  let errCode = err.statusCode || 500;
  let errMsg = err.message || "Internal Server Error";

  // reurn the error
  return res.status(errCode).json({
    success: false,
    message: errMsg,
    code: errCode,
  });
};

export default ErrorMiddleware;
