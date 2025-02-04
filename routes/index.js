const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const passport = require('passport');

// //creationf of the api documentation
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
    res.send('Hello World I am Erick Orellana');
});

//crud procedures
router.use('/database', require('./collection'));

//log in and log out.
router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout',
    (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        })
    }
)

module.exports = router;