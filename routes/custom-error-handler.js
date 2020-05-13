const HttpStatus = require('http-status-codes');
const VerifileException = require('../exceptions/verifile-exception')
const RequestValidationException = require('../exceptions/request-validation-exception')

module.exports = function (err, req, res, next) {
    if(err instanceof VerifileException) {
      res
        .status(err.httpStatus)
        .json({
          code: err.code,
          message: err.message
        })
    } else if(err instanceof RequestValidationException) {
        res
        .status(err.httpStatus)
        .json({
          code: err.code,
          message: err.message,
          reason: err.reason
        })
    } else {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          code: "GENERIC_ERROR",
          message: err.message  
        })
    }
  }