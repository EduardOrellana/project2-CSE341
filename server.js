const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const database = require('./database');
const port = process.env.PORT || 3000;

//initialize our express app
const app = express();

//first middleware before response is sent
app.use(bodyParser.json());

//a wall of security
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', routes);

//connect to databse
database.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on on http://localhost:${port}`);
        });
    }
})