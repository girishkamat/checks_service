const router = require('express').Router()
const validationMiddleware = require('./validation-middleware')
const verifileProxy = require('../endpoints/verifile-proxy')
const ValidationSchemas = require('./validation-schemas')
var logger = require('log4js').getLogger('aml-check-route');

/**
* @swagger
*  /check/aml:
*    post:
*      tags:
*        - AMLCheck
*      description: |
*        Do AML check and get the report
*      consumes:
*        - application/json  
*      produces:
*        - application/json
*      parameters:
*        - name: Applicant details
*          description: details about the applicant
*          in: body
*          required: true
*          schema:
*            $ref: '#/components/schemas/applicantInputSchema'
*      responses:
*        200:
*          description: amlcheckreport
*          schema:
*            type: object
*            items:
*              $ref: '#/components/schemas/getAmlReportSchema'
*        400:
*          description: Bad Request Input
*          schema :
*            type: object
*            properties :
*              status: 
*                type: number
*                example: 400
*              name: 
*                type: string
*                example : "Bad Request"
*              message:
*                type : array
*                items :
*                  type : object
*                  properties:
*                    message:
*                      type: string
*                      example : "Name must either have a KnownFromDate or have the IsFromBirth field set to true."
*                    fieldPath :
*                      type : string
*                      example : "Candidate.CurrentName.KnownFromDate"
*                    errorLevel :
*                      type : number
*                      example : 0
*              description:
*                type : string
*                example : "Please check your input"
*              api : 
*                type : string
*                example : "Credit Check Api"
*              function :
*                type : string
*                example : "createOrder"
*              stacktrace :
*                type : string
*                example : "Bad Request: Bad Request: [object Object],[object Object]\n    at Promise.catch (C:\\xampp\\htdocs\\RobaMortgage\\Services\\creditcheckapi\\app\\controllers\\createOrder.controller.js:99:9)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"       
*        401:
*          description: Invalid Authorization
*        403:
*          description: Forbidden
*        404:
*          description : Not Found
*        405:
*          description: Method Not Allowed
*/
router.post('/check/aml',
    validationMiddleware(ValidationSchemas.checkAMLSchema, 'body'),
    (req, res, next) => {
        logger.info("Performing AML check")
        verifileProxy
            .doAMLCheck(req.body)
            .then(response => res.json(response))
            .catch(error => next(error))
    }
)

module.exports = router