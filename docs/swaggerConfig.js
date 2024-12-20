const swaggerJsDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Student CRUD API',
    version: '1.0.0',
    description: 'API documentation for Student CRUD operations',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./docs/*.js'], // Include all files in the docs folder
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
