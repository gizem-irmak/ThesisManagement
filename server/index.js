'use strict';

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SamlStrategy = require('passport-saml').Strategy;
const auth0Strategy = require('passport-auth0');
const session = require('express-session');
const UsersServices = require('./Services/Users');
const path = require('path');
const fs = require('fs');
const { pass } = require('jest-extended');
const bodyParser = require('body-parser');
const PeriodicDataCheck = require('./Services/DataChecks');

passport.use(new SamlStrategy({
    entryPoint: 'https://thesis-management-team17.eu.auth0.com/samlp/fgIV2JAWJdjmSQPXK9GrtR4FgFomIqLS',
    callbackUrl: 'http://localhost:3000/login/callback',
    issuer: 'urn:thesis-management-team17.eu.auth0.com',
    cert: fs.readFileSync(path.join(__dirname, './cert.pem'), 'utf8'),
    acceptedClockSkewMs: 30000,
}, function (profile, done) {
    return done(null, {
        email: profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        nickname: profile['http://schemas.auth0.com/nickname'],
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    return done(null, user);
});

// Init express
const app = express();
const port = 3000;

app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(session({
    secret: 'S3cr3tV4lu5_s3ss!0n',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000, //60000ms = 1min: for testing
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

app.use("/api", require("./Router/RouterAPI"));

app.get('/login', (req, res, next) => {
    passport.authenticate('saml', { failureRedirect: '/login', failureFlash: true })(req, res, next);
});

app.post('/login/callback', bodyParser.urlencoded({ extended: false }), (req, res, next) => {
    if (!req.isAuthenticated())
        passport.authenticate('saml', { failureRedirect: '/login', failureFlash: true }, async function (err, user, info) {
            if (err)
                return next(err);

            if (!user)
                return res.redirect('/login');

            const userData = await UsersServices.getUserById(user.nickname.substring(1, user.nickname.length));

            if (userData === undefined)
                return next(new Error("User data not found"));

            req.logIn(userData, async function (err) {
                if (err)
                    return next(err);

                let redirectURL;

                if (userData.role === "Student")
                    redirectURL = "http://localhost:5173/student-applications";
                else if (userData.role === "Teacher")
                    redirectURL = "http://localhost:5173/my-proposals";
                else if (userData.role === "Secretary")
                    redirectURL = "http://localhost:5173/secretary-requests";

                return res.redirect(redirectURL);
            });
        })(req, res, next);
    else
        res.redirect('http://localhost:5173');
});

app.get('/logout', (req, res) => {
    req.isAuthenticated() ?
        req.logOut(res, function (err) {
            if (err) { return next(err); }

            const redirectURL = "http://localhost:5173";
            return res.redirect(redirectURL);
        })
        : res.redirect('http://localhost:5173');
});

// activate the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

//Start the periodic check for the expiring proposals
const PeriodicDataChecksIntervalId = setInterval(PeriodicDataCheck.checkForMidnight, 60000);