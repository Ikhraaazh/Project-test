const errorHandler = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal server error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    (code = 400), (message = err.errors[0].message);
  } else if (
    err.name === "Email required" ||
    err.name === "Password required"
  ) {
    (code = 400), (message = err.name);
  } else if (err.name === "invalid email/password") {
    (code = 401), (message = err.name);
  } else if (err.name === "noToken") {
    (code = 401), (message = "Please login first");
  } else if (err.name === "Unauthorized" || err.name === "JsonWebTokenError") {
    (code = 401), (message = "Invalid token");
  } else if (err.name === "Data not found") {
    (code = 404), (message = err.name);
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
