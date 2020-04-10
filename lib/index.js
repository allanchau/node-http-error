module.exports = (
  options = {
    defaultCode: "",
    defaultMessage: "",
    defaultStatusCode: 400,
  }
) => (req, res, next) => {
  res.error = (err = "") => {
    let code = options.defaultCode || "";
    let message = options.defaultMessage || "";
    let statusCode = options.defaultStatusCode || 400;

    if (typeof err === "string") {
      message = err;
    }

    if (err.code) {
      code = err.code;
    }

    if (err.message) {
      message = err.message;
    }

    if (err.statusCode) {
      statusCode = err.statusCode;
    }

    return res.status(statusCode).json({
      error: { code, message },
    });
  };

  return next();
};
