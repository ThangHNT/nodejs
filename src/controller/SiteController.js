const Course = require('../models/course.js');
const { multiComponents } = require('../convertToObject.js');
class SiteController {
    home(req, res, next) {
        Course.find() 
            .then((course) => {
                res.render('home', { 
                    course: multiComponents(course),
                })
            })
            .catch(next);
    }
}

module.exports = new SiteController();
