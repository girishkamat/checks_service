const HttpStatus = require('http-status-codes');

class CorrelationIdHeaderMissingException extends Error {
    constructor() {
      super("Header 'X-Correlation-Id' is missing");
      this.httpStatus = HttpStatus.BAD_REQUEST
      this.code = "CORRELATION_ID_HEADER_MISSING"
    }
}
module.exports = CorrelationIdHeaderMissingException