const RequestValidationException = require('../exceptions/requestValidationException')

const middleware = (schema, property) => { 
  return (req, res, next) => { 
    const { error } = schema.validate(req[property], {
        allowUnknown: true
      }); 
    const valid = error == null; 
    if (valid) { 
      next(); 
    } else {
      const { details } = error; 
      const reason = details.map(i => i.message).join(',')
      next(new RequestValidationException("REQUEST_VALIDATION_ERROR",
       "Failed to validate request " + property, 
       reason))
    } 
  } 
} 
module.exports = middleware;