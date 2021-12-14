const siteRouter = require('./site.js');
const courseRouter = require('./course.js');
const userRouter = require('./user.js');
const passport = require('passport');
function route(app) {
    app.use('/courses', courseRouter);
    app.use('/account',userRouter);
    app.use('/home',siteRouter);
    // app.use('/home/:id',passport.authenticate('facebook',{session:false}),siteRouter);
    app.use('/', (req,res) => {res.render('gettingStarted')});
}

module.exports = route;
