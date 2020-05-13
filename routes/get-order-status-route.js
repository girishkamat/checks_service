const router = require('express').Router()
const verifileProxy = require('../endpoints/verifile-proxy')

/**
 * @swagger
 *
 *  paths:
 *      /check/{id}/status:
 *         get:
 *          tags: 
 *            - CheckStatus    
 *          description: Returns the status of a previously requested check
 *          produces:
 *            - application/json
 *          parameters:
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
        
    });

function mapCheckType(checkName) {
    if(checkName == 'UKIDAMLCheckUKAML') {
        return "aml"
    } else {
        return response.checkStatuses[0].checkName
    }
}

module.exports = router