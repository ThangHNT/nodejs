
var passport = require('passport');
var session = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user.js');
function authenticate(app) {
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    }))
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    
    passport.use(new FacebookStrategy({
        clientID: '610750163507271',
        clientSecret: '20360b31af2259f76484428ea92e0fd4',
        callbackURL: "https://courses-hnt.herokuapp.com/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
        function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }
    ));
    
    // app.get('/auth/facebook', passport.authenticate('facebook', { authType: 'reauthenticate'}));
    app.get('/auth/facebook', passport.authenticate('facebook'));
    // id có sẵn 61b3811ab5ed34864acaae3c
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            const id = req.user.id;
            const user = new User({facebookId :id, email : ''});
            user.save();
            res.redirect(`/home/${id}`);
            
        });
}

module.exports = authenticate;
