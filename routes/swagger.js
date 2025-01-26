const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Ruta para servir Swagger UI
router.get('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
