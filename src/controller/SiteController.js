const Course = require('../models/course.js');
const User = require('../models/user.js');
const { multiComponents } = require('../convertToObject.js');
class SiteController {
    home(req, res, next) {
        // const url = req.baseUrl;
        // const id = url.slice(url.lastIndexOf('/') + 1);
        // Course.find({owner: id})
        //     .then((course) => {
        //         res.render('home', {
        //             userId : id,
        //             course: multiComponents(course),
        //         });
        //     })
        //     .catch(next);
        res.json(req.user);
    }
}

module.exports = new SiteController();
