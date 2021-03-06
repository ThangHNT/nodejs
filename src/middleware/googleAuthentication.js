
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var session = require("express-session");
var passport = require('passport');
const User = require('../models/user.js');
const Img = require('../models/img.js');

function ggAthentication(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))

    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: '604856952366-efq4pjustjjib5chvsmcvofvcoko6qbt.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "https://hoclaptrinh-hnt.herokuapp.com/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            return cb(null,profile);
        }
    ));

    app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'], session:false }));

    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res,next) {
        const id = req.user.id;
        const fullName = req.user.name.familyName + ' ' + req.user.name.givenName;
        const avatar = req.user.photos[0].value;
        User.findOne({googleId: id}, function(err, user) {
            if(user == null) {
                const image = new Img({name: 'gg-avatar', id : id, src : avatar});
                image.save();
                const user = new User({googleId :id, email : '', username : fullName,authType: 'google', avatar: image});
                user.save()
                    .then(() => {
                        image.owner = (user);
                        image.save();
                        res.redirect(`/home`);
                    })
                    .catch(next);
            }
            else res.redirect(`/home`);
        })
    });
}

module.exports = ggAthentication;
