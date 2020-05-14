const log4js = require('./config/log4js-config')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc')
const rTracer = require('cls-rtracer')
const app = express()
const config = require("config")
const port = process.env.PORT || config.get('port')
const customErrorHandler = require('./routes/customErrorHandler')
const CorrelationIdHeaderMissingException = require('./exceptions/correlationidHeaderMissingException')
const logger = log4js.getLogger('app')

app.use((req,res,next) => {
  if(!req.header('X-Correlation-Id')) {
    next(new CorrelationIdHeaderMissingException())
  } else {
    next()
  }
})
app.use(rTracer.expressMiddleware({
    useHeader: true,
    headerName: 'X-Correlation-Id'
  }))
app.use(bodyParser.json())

// business routes
app.use('/', require('./routes/amlCheckRoute'))
app.use('/', require('./routes/getOrderStatusRoute'))
// app.use('/', require('./routes/creditCheckRoute'))

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
    './routes/swaggerComponents.yml',
    './routes/amlCheckRoute.js',
    './routes/getOrderStatusRoute'
    //'./routes/creditCheckRoute'
  ]
}
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true
}))

app.listen(port, () => logger.info(`Checks service listening on port ${port}!`))