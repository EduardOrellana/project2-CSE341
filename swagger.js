const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "API Contacts Erick Orellana",
        description: "API of the second project",
    },
    host: "project2-cse341-sga3.onrender.com",
    // host: "http://localhost:3000/",
    schemes: ['https'],
    basePath: "/database"
};

const outputFile = './swagger.json';
const routesFile = ['./routes/collection.js', './routes/index.js'];

swaggerAutogen(outputFile, routesFile, doc);