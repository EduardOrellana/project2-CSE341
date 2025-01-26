const router = require('express').Router();
const controller = require('../controllers/index');


//Get all
router.get('/:Collection', controller.getAll);

//Get by ID
router.get('/:Collection/:id', controller.getItemById);

//Update by ID
router.put('/:Collection/:id', controller.updateItem);

//Create
router.post('/:Collection', controller.createItem);

//Delete by ID
router.delete('/:Collection/:id', controller.deleteItem);

router.use('/', (req, res) => {
    res.status(202).send('Ready to CRUD the databases');
});

module.exports = router;