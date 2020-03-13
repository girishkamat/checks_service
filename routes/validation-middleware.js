const Joi = require('@hapi/joi'); 
const middleware = (schema, property) => { 
  return (req, res, next) => { 
    const { error } = schema.validate(req[property], {
        allowUnknown: true
      }); 
    const valid = error == null; 
    if (valid) { next(); } 
    else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',')
      console.log("error",  message); 
      res.status(422).json({ 
          code: "REQUEST_VALIDATION_ERROR",
          message: "Failed to validate request " + property,
          reason: message
        }) 
    } 
  } 
} 
module.exports = middleware;