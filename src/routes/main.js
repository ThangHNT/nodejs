const siteRouter = require('./site.js');
const courseRouter = require('./course.js');
const userRouter = require('./user.js');

function route(app) {
    app.use('/courses', courseRouter);
    app.use('/account',userRouter);
    app.use('/home/:id',siteRouter);
    app.use('/', (req,res) => {res.render('gettingStarted')});
}

module.exports = route;
