const defaults = {
  defaultCode: "",
  defaultMessage: "",
  defaultStatusCode: 400,
};

module.exports = (options = defaults) => (req, res, next) => {
  res.error = (err) => {
    let code = options.defaultCode || defaults.defaultCode;
    let message = options.defaultMessage || defaults.defaultMessage;
    let statusCode = options.defaultStatusCode || defaults.defaultStatusCode;

    if (err && typeof err === "string") {
      message = err;
    }

    if (err && err.code) {
      code = err.code;
    }

    if (err && err.message) {
      message = err.message;
    }

    if (err && err.statusCode) {
      statusCode = err.statusCode;
    }

    return res.status(statusCode).json({
      error: { code, message },
    });
  };

  return next();
};
