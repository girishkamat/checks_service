const express = require('express')
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc');

const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
// AML check router
app.use('/', require('./routes/aml-check-route'))

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
  apis: ['./routes/aml-check-route.js'],
}
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))