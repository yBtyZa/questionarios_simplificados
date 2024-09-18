const swaggerAutogen = require('swagger-autogen')()
require('dotenv').config()

const doc = {
    info: {
        title: 'Questionarios Simplificados',
        description: 'API para questionarios simplificados',
        version: '1.0.0'
    },
    host: `${process.env.DATABASE_HOST}:3333`,
    security: [{
        bearerAuth: []
    }],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'"
        }
    }
    
}

const outputFile = './swagger-output.json'
const endpointsFiles = [
    './src/server.js'
]

swaggerAutogen(outputFile, endpointsFiles, doc)