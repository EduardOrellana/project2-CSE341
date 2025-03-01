const moduler = require('../modules');

let baseController = {};

//Get All Item for both Databases
baseController.getAll = async (req, res) => {
    try {
        const collection = req.params.Collection;
        const result = await moduler.getAll(collection);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
};

//Get Item by ID
baseController.getItemById = async (req, res) => {
    try {
        const collection = req.params.Collection;
        const result = await moduler.getItemById(collection, req.params.id);
        if (result.error) {
            res.status(404).json(result);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
}

//Update Item by ID
baseController.updateItem = async (req, res) => {
    try {
        const collection = req.params.Collection;
        const result = await moduler.updateItem(collection, req.params.id, req.body);
        if (result.error) {
            res.status(404).json(result);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
};

//Create Item
baseController.createItem = async (req, res) => {
    try {
        const collection = req.params.Collection;
        const result = await moduler.createItem(collection, req.body);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
};

//Delete Item by ID
baseController.deleteItem = async (req, res) => {
    try {
        const collection = req.params.Collection;
        const result = await moduler.deleteItem(collection, req.params.id);
        if (result.error) {
            res.status(404).json(result);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
};

module.exports = baseController;