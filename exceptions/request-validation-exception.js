const HttpStatus = require('http-status-codes');

class RequestValidationException extends Error {
    constructor(code, message, reason) {
      super(message);
      this.httpStatus = HttpStatus.BAD_REQUEST
      this.code = code
      this.message = message
      this.reason = reason
    }
}
module.exports = RequestValidationException