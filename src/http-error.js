// http://www.ietf.org/assignments/http-status-codes/http-status-codes.xml
const StatusCodes = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  208: 'Already Reported',
  226: 'IM Used',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  425: 'Unassigned',
  426: 'Upgrade Required',
  427: 'Unassigned',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  430: 'Unassigned',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  509: 'Unassigned',
  510: 'Not Extended',
  511: 'Network Authentication Required',
};

class HttpError extends Error {

  /**
   * Create a HttpError.
   * @param {Number} statusCode The HTTP status code
   * @param {String} [message=statusCodes[statusCode]] An optional error message
   */
  constructor(statusCode, message = StatusCodes[statusCode]) {

    super(message);

    const defaultStatusCode = 400;
    const has = Object.prototype.hasOwnProperty;

    this.statusCode = defaultStatusCode;
    this.description = StatusCodes[defaultStatusCode];

    if (has.call(StatusCodes, statusCode)) {

      this.statusCode = statusCode;
      this.description = StatusCodes[statusCode];

    }

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }

    this.stack = (new Error(message)).stack;

  }

  static errorHandler(err, req, res, next) {

    if (err instanceof HttpError) {

      /* eslint-disable sort-keys */
      return res.status(err.statusCode).json({
        code: err.statusCode,
        status: err.description,
        message: err.message,
      });
      /* eslint-enable sort-keys */

    }

    return next(err);

  }

}

module.exports = HttpError;
