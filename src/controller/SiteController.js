const Course = require('../models/course.js');
const User = require('../models/user.js');
const { multiComponents } = require('../convertToObject.js');
class SiteController {
    home(req, res, next) {
        const url = req.baseUrl;
        var id = '';
        for(let i = 0; i < url.length; i++) {
            if(url[i] >= '0' && url[i] <= '9'){
                id += url[i];
            }
        }
        Course.find({owner: id})
            .then((course) => {
                res.render('home', {
                    userId : id,
                    course: multiComponents(course),
                });
            })
            .catch(next);
        
    }
}

module.exports = new SiteController();
