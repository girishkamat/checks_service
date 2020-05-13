const log4js = require('./config/log4js-config')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc')

const app = express()
const config = require("config")
const port = process.env.PORT || config.get('port')
const customErrorHandler = require('./routes/custom-error-handler')

const logger = log4js.getLogger('app')

app.use(bodyParser.json())

// AML check router
app.use('/', require('./routes/aml-check-route'))
app.use('/', require('./routes/get-order-status-route'))
// app.use('/', require('./routes/credit-check-route'))
app.use(customErrorHandler)

//swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Checks Service', // Title (required)
      description: "API for performing candidate checks via the verifile API",
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: [
    './routes/swagger-components.yml',
    './routes/aml-check-route.js',
    './routes/get-order-status-route'
    //'./routes/credit-check-route'
  ]
}
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true
}))

app.listen(port, () => logger.info(`Checks service listening on port ${port}!`))