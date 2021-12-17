const siteRouter = require('./site.js');
const courseRouter = require('./course.js');
const userRouter = require('./user.js');

function route(app) {
    // app.use('/courses',(req, res, next) => {
    //     if(req.user) {
    //         return next();
    //     }   else res.render('Login-failed');
    // } , courseRouter);
    // app.use('/home',(req, res, next) => {
    //     if(req.user) {
    //         return next();
    //     }   else res.render('Login-failed');
    // },siteRouter);
    app.use('/courses',courseRouter);
    app.use('/home',siteRouter);
    app.use('/account',userRouter);
    app.use('/', (req,res) => {res.render('gettingStarted')});
}

module.exports = route;
