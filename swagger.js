const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "API Contacts Erick Orellana",
        description: "API of Contacts",
    },
    host: "https://project2-cse341-sga3.onrender.com/database",
    schemes: ['https']
};

const outputFile = './swagger.json';

const routesFile = ['./routes/collection.js'];

swaggerAutogen(outputFile, routesFile, doc);