const Course = require('../models/course.js');
const User = require('../models/user.js');
const { multiComponents } = require('../convertToObject.js');
class SiteController {
    home(req, res, next) {
        // if(req.user){
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
        // }
        // else {
        //     res.status(404).render('Login-failed');
        // }
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
