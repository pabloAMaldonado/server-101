const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 3000
const webUrl = process.env.webUrl || `http://localhost:${PORT}`

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Title', // Change
      version: '1.0.0'
    }
  },
  components: {
    securitySchemes: {
      schemas: {

      },
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],

  apis: ['./routes/*.js', './model/*.js', './swaggerComments/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

exports.swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  console.log(
      `Version 1 Docs are available on ${webUrl}/api-docs`
  )
}
