const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const database = require('./database');
const port = process.env.PORT || 3000;
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github').Strategy;
const cors = require('cors');
require('dotenv').config();


//initialize our express app
app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    //This is the basic express session({}) configuration
    .use(passport.initialize())
    //Init passport on every route call.
    .use(passport.session())
    // allow passport to use "express-session" to store user data
    .use((req, res, next) => {
        console.log(req.session);
        console.log(req.user);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'PATCH', 'DELETE'] }))
    .use(cors({ origin: '*' }))
    .use(routes);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ githubId: profile.id}, function (err, user){}})
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
}); //serialize the user data
passport.deserializeUser((user, done) => {
    done(null, user);
}); //deserialize the user data


app.get('/callback',
    passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
    (req, res) => {
        // Successful authentication, redirect home.
        req.session.user = req.user;
        res.redirect('/');
    });

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