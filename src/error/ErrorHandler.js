module.exports = (err, req, res, next) => {
  const { status, message, errors } = err;
  let validationErrors;
  if (errors) {
    validationErrors = {};
    errors.forEach((error) => (validationErrors[error.param] = req.t(error.msg)));
  }
  res
    .status(status)
    .send(
      {
        message: req.t(message),
        timestamp: Date.now(),
        path: req.originalUrl,
        validationErrors
      });
}