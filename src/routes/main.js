const siteRouter = require('./site.js');
const courseRouter = require('./course.js');
const userRouter = require('./user.js');

function route(app) {
    // app.use('/courses', courseRouter);
    app.use('/courses', (req, res, next) => {
        res.json(req.cookies.userId);
    });
    app.use('/account',userRouter);
    app.use('/home',siteRouter);
    app.use('/', (req,res) => {res.render('gettingStarted')});
}

module.exports = route;
