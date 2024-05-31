const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const dotenv = require('dotenv')
const path = require('path');

dotenv.config()

const UserSchema = require('../swaggerComments/swaggerSchema/UserSchemaComment.js')

const PORT = process.env.PORT || 3000
const webUrl = process.env.webUrl || `http://localhost:${PORT}`

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Placeholder', // Change
      version: '1.0.0',
      description: 'API documentation for your application',
    }
  },
  components: {
    securitySchemes: {
      schemas: {
        User: UserSchema
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

  apis: [
    path.resolve(__dirname, '../routes/*.js'), 
    path.resolve(__dirname, '../model/*.js'), 
    path.resolve(__dirname, '../swaggerComments/*.js'),
    path.resolve(__dirname, '../swaggerComments/swaggerSchema/*.js')

  ]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  console.log(
      `Version 1 Docs are available on ${webUrl}/api-docs`
  )
}

module.exports = { swaggerDocs }
