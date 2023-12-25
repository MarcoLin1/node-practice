const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Todo API',
    description: 'Todo API Information'
  },
  host: 'localhost:3000'
}

const outputFile = './swagger-output.json'
const routes = ['./app.js'] // 因為 app.js 裡有所有的 route

swaggerAutogen(outputFile, routes, doc)