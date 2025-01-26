const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

//creationf of the api documentation
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
    res.send('Hello World I am Erick Orellana');
});

//crud procedures
router.use('/database', require('./collection'));

module.exports = router;