module.exports = (err, req, res, next) => {
  res
    .status(err.status)
    .send(
      {
        message: err.message,
        timestamp: Date.now(),
        path: req.originalUrl
      });
}