const errorHandler = (err, req, res, next) => {
  const errMessage = err.message || "Internal Server Error";
  const errStatus = err.status || 500;

  console.error(err);

  res.status(errStatus).send(errMessage);
};

export default errorHandler;
