const database = require('../database');
const ObjectId = require('mongodb').ObjectId;

//get all items
const getAll = async (collection) => {
    try {
        const db = await database.getDb().db().collection(collection).find().toArray();
        return db;
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

//Get one Item by id
const getItemById = async (collection, id) => {
    try {
        if (!ObjectId.isValid(id)) {
            return { error: 'Invalid ID' };
        }

        console.log(id);

        const result = await database.getDb().db().collection(collection).findOne({ _id: new ObjectId(id) });

        if (!result) {
            return { error: 'Item not found' };
        } else {
            return result;
        }

    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

//Update Item function
const updateItem = async (collection, id, dataSet) => {
    try {
        if (!ObjectId.isValid(id)) {
            return { error: 'Invalid ID' };
        }

        const result = await database.getDb().db().collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: dataSet });

        if (result.matchedCount === 0) {
            return { error: 'Item not found' };
        } else if (result.modifiedCount === 0) {
            return { error: 'Item not updated' };
        } else {
            return { message: 'Item updated' };
        }
    } catch (err) {
        console.log(err);
        return { error: err };
    }
}

//createCar function
const createItem = async (collection, dataSet) => {
    try {
        const result = await database.getDb().db().collection(collection).insertOne(dataSet);
        return result.ops[0];
    } catch (err) {
        console.log(err);
        return { error: err };
    }
}

//deleteCar function
const deleteItem = async (collection, id) => {
    try {
        if (!ObjectId.isValid(id)) {
            return { error: 'Invalid ID' };
        }

        const result = await database.getDb().db().collection(collection).deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return { error: 'Item not found' };
        } else {
            return { message: 'Item deleted' };
        }
    } catch (err) {
        console.log(err);
        return { error: err };
    }
}

module.exports = {
    getAll,
    getItemById,
    updateItem,
    createItem,
    deleteItem
};