const siteRouter = require('./site.js');
const courseRouter = require('./course.js');
const userRouter = require('./user.js');
// ------------------- authenticate with fb ---------------------
var passport = require('passport');
var session = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;
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
    callbackURL: "https://hoclaptrinh-hnt.herokuapp.com/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

function route(app) {
    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            res.json({message: 'Facebook'});
        });
    app.use('/courses', courseRouter);
    app.use('/account',userRouter);
    app.use('/home/:id',siteRouter);
    app.use('/', (req,res) => {res.render('gettingStarted')});
    
}

module.exports = route;
