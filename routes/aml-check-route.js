const router = require('express').Router()
const validationMiddleware = require('./validation-middleware')
const Joi = require('@hapi/joi')
const verifileProxy = require('../endpoints/verifile-proxy')
const mockResponses = require('../endpoints/mock-responses')

/**
 * @swagger
 *
 * /check/aml:
 *   post:
 *     description: Performs AML check using the verifile API
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: mock
 *         required: false
 *         schema:
 *            type: boolean
 *         description: When true, returns a mock response
 *     requestBody:
 *       description: The data required to perform AML check
 *       required: true
 *       content:
 *          'application/json':
 *              schema: # Request body contents
 *                type: object  
 *                properties:  
 *                  previousNames:
 *                    type: array
 *                    items: 
 *                      type: object  
 *                      properties:
 *                          title: 
 *                              type: string
 *                              required: true    
 *                          firstName: 
 *                              type: string
 *                              required: true
 *                          lastName: 
 *                              type: string
 *                              required: true    
 *                          middleNames: 
 *                              type: string
 *                              required: true    
 *                          isFromBirth: 
 *                              type: boolean
 *                              required: true
 *                          knownFromDate: 
 *                              type: string
 *                              required: true
 *                          knownToDate: 
 *                              type: string
 *                              required: true
 *                  addressList:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              dateMovedToThisAddress:
 *                                  type: string
 *                                  required: true
 *                              dateLeftThisAddress:
 *                                  type: string
 *                                  required: false
 *                              isCurrentAddress:
 *                                  type: boolean
 *                                  required: true
 *                              address:
 *                                  type: object
 *                                  properties:
 *                                      houseNumber: 
 *                                          type: string
 *                                      streetName: 
 *                                          type: string
 *                                      town:
 *                                          type: string
 *                                      county:
 *                                          type: string
 *                                      postcode:
 *                                          type: string
 *                                      country: 
 *                                          type: string 
 *                  currentName:
 *                      type: object
 *                      properties:
 *                          title: 
 *                              type: string
 *                              required: true    
 *                          firstName: 
 *                              type: string
 *                              required: true
 *                          lastName: 
 *                              type: string
 *                              required: true    
 *                          middleNames: 
 *                              type: string
 *                              required: true    
 *                          isFromBirth: 
 *                              type: boolean
 *                              required: true   
 *                  personalInfo:
 *                      type: object
 *                      properties:
 *                          gender: 
 *                              type: string
 *                              required: true    
 *                          dateOfBirth: 
 *                              type: string
 *                              required: true
 *                          hasValidDrivingLicense: 
 *                              type: boolean
 *                              required: true    
 *                          candidateEmail: 
 *                              type: string
 *                              required: true    
 *                          motherMaidenName: 
 *                              type: string
 *                              required: true   
 *                          nationalityAtBirth: 
 *                              type: string
 *                              required: true   
 *                          countryOfBirth: 
 *                              type: string
 *                              required: true
 *                          townOfBirth: 
 *                              type: string
 *                              required: true   
 *                          mobilePhone: 
 *                              type: object
 *                              properties:
 *                                  phoneNumber:
 *                                      type: string
 *                                  countryCode:
 *                                      type: string
 *                          homePhone: 
 *                              type: object
 *                              required: false
 *                              properties:
 *                                  phoneNumber:
 *                                      type: string
 *                                  countryCode:
 *                                      type: string  
*                  identity:
 *                      type: object
 *                      properties:                            
 *                          passportDocument: 
 *                              type: object
 *                              properties:
 *                                  passportIssuingCountry:
 *                                      type: string
 *                                  passportNumber:
 *                                      type: string             
 *                                  passportIssueDate:
 *                                      type: string
 *                                  passportExpiryDate:
 *                                      type: string   
 *                                  passportDateOfBirth:
 *                                      type: string  
 *                          drivingDocument: 
 *                              type: object
 *                              properties:
 *                                  driverLicenseType:
 *                                      type: string
 *                                  driverLicenseIssuingCountry:
 *                                      type: string             
 *                                  driverLicenseNumber:
 *                                      type: string
 *                                  driverLicenseDate:
 *                                      type: string   
 *                                  driverLicenseDateOfBirth:
 *                                      type: string       
 *                          nationalInsuranceNumberDocument: 
 *                              type: object
 *                              properties:
 *                                  nationalInsuranceNumber:
 *                                      type: string      
 *                required:
 *                  - addressList
 *                  - currentName
 *                  - personalInfo
 *                  - identity  
 *     responses:
 *          200:
 *              description: Returns id and application status
 *              content:
 *                  'application/json':
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                              status:
 *                                  type: string
 *                              
 */
const checkAMLSchema = Joi.object().keys({
    currentName: Joi.object().keys({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        middleNames: Joi.string().required(),
        isFromBirth: Joi.boolean().required()
    })
})
router.post('/check/aml',
    validationMiddleware(checkAMLSchema, 'body'),
    (req, res) => {
        if(req.query.mock == "true") {
            res.status(200).json(mockResponses.doAMLCheckResponse())
        } else {
            verifileProxy
                .doAMLCheck(req.body)
                .then((response) => {
                    res.status(200).json({
                        id: response.data.Id,
                        status: response.data.OrderState.StateDescription
                    })
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).json({ error: error })
                })
        }
    }
);
/**
 * @swagger
 *
 *  paths:
 *      /check/{id}/status:
 *         get:
 *          description: Returns the status of a previously requested check
 *          produces:
 *            - application/json
 *          parameters:
 *              - in: query
 *                name: mock
 *                required: false
 *                schema:
 *                  type: boolean
 *                description: When true, returns a mock response   
 *              - in: path
 *                name: id   # Note the name is the same as in the path
 *                required: true
 *                schema:
 *                  type: integer
 *                description: The id of a previously requested check
  *         responses:
 *           200:
 *              description: Returns id and application status
 *              content:
 *                  'application/json':
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                              candidateFullName:
 *                                  type: string
 *                              check:
 *                                  type: integer
 *                              status:
 *                                  type: string
 */
router.get('/check/:id/status',
    (req, res) => {
        if(req.query.mock == "true") {
            res.status(200).json(mockResponses.getOrderStatusResponse(req.params.id))
        } else {
            verifileProxy
                .getOrderStatus(req.params.id)
                .then((response) => {
                    res.status(200).json({
                        id: response.data.id,
                        candidateFullName: response.data.candidateFullName,
                        check: mapCheckType(response.data.checkStatuses[0].checkName),
                        status: response.data.orderStatus
                    })
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).json({ error: error })
                })
        }
    });

function mapCheckType(checkName) {
    if(checkName == 'UKIDAMLCheckUKAML') {
        return "aml"
    } else {
        return response.checkStatuses[0].checkName
    }
}

module.exports = router