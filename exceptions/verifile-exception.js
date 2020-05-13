class VerifileException extends Error {
    constructor(httpStatus, code, message) {
      super(message); 
      this.httpStatus = httpStatus
      this.code = code
    }
}
module.exports = VerifileException