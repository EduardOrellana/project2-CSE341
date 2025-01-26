const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

//crud procedures
router.use('/database', require('./collection'));

router.use('/api-docs', require('./swagger'));

module.exports = router;