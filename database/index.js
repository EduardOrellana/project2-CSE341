//Use ENV variables to store the connection string
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGO_URI)
        .then(client => {
            database = client;
            callback(null, database);
        })
        .catch(err => {
            callback(err);
        });
}

const getDb = () => {
    if (!database) {
        throw Error('Database is not initialized');
    }
    return database;
}

module.exports = { initDb, getDb };