
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
    app.use(passport.initialize());  // khởi tạo passport
    // sử dụng session
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    // ==========================
    passport.use(new FacebookStrategy({
        clientID: '610750163507271',
        clientSecret: '20360b31af2259f76484428ea92e0fd4',
        callbackURL: "https://hoclaptrinh-hnt.herokuapp.com/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
        function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
            // xác thực thành công => req.user có thông tin profile do fb cung cấp
        }
    ));
    
    // app.get('/auth/facebook', passport.authenticate('facebook', { authType: 'reauthenticate'}));
    app.get('/auth/facebook', passport.authenticate('facebook'));  // gửi yêu cầu đăng nhập với fb
    app.get('/auth/facebook/callback',              // fb trả về sau khi đăng nhập thành công
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res, next) {
            const id = req.user.id;
            const name = req.user.displayName;
            const avatar = req.user.photos[0].value;
            // User.findOne({facebookId: id}, function(err, user) {
            //     if(user == null) {
            //         const user = new User({facebookId :id, email : '', username : name,authType: 'facebook'});
            //         user.save()
            //             .then(() => {
            //                 res.redirect(`/home`);
            //             })
            //             .catch(next);
            //     }
            //     else res.redirect(`/home`);
            // })
            res.json(req.user);
        });
}

module.exports = authenticate;
