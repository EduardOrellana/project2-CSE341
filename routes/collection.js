const router = require('express').Router();
const controller = require('../controllers/index');
const isAuthenticated = require('../middlewares/authenticate.js');

router.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Not logged in');
});

//Get all
router.get('/:Collection',
    controller.getAll);

//Get by ID
router.get('/:Collection/:id',
    // isAuthenticated,
    controller.getItemById);

//Update by ID
router.put('/:Collection/:id',
    // isAuthenticated,
    controller.updateItem);

//Create
router.post('/:Collection',
    isAuthenticated,
    controller.createItem);

//Delete by ID
router.delete('/:Collection/:id',
    isAuthenticated,
    controller.deleteItem);


module.exports = router;