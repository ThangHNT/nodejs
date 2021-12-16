
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var session = require("express-session");
var passport = require('passport');

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
            const name = req.user.name;
            res.json(req.user);
            // User.findOne({facebookId: id}, function(err, user) {
            //     if(user == null) {
            //         const user = new User({facebookId :id, email : '', username : name});
            //         user.save()
            //             .then(() => {
            //                 res.redirect(`/home/${user._id}`);
            //             })
            //             .catch(next);
            //     }
            //     else res.redirect(`/home/${user._id}`);
            // })
    });
}

module.exports = ggAthentication;
