const Course = require('../models/course.js');
const User = require('../models/user.js');
const { component } = require('../convertToObject.js');
const {multiComponents} = require('../convertToObject.js');
class CourseController {
    courseDetail(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courseDetail', {
                    course: component(course),
                });
            })
            .catch(next);
    }

    // tao view cho dang khoa hoc
    createCourse(req, res, next) {
        res.render('createCourse', {
            userId : req.params.id
        });
        
    }

    // luu khoa hoc moi
    storeCourse(req, res, next){

        req.body.img = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        const userId = req.params.id;
        course.owner = userId;
        course.save();
        res.redirect(`/courses/myCourses`);

    }

    // tao view cho ds khoa hoc cua toi
    myCourses(req, res, next){
        const id = req.params.id;
        Promise.all([Course.find(),Course.countDocumentsDeleted()])
            .then(([courses,count]) => {
                res.render('myCourses',{
                    count,
                    userId : id,
                    courses : multiComponents(courses)
                })
            })
            .catch(next);

    }

    // tao view cho form chinh sua khoa hoc
    editCourse(req, res, next){
        Course.findById(req.params.id)
            .then(course => {
                res.render('editCourse', {
                    course : component(course)
                })
            })
            .catch(next);
    }

    // luu thay doi cua khoa hoc
    update(req, res, next){
        req.body.img = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        var userId ;
        Course.findOne({_id: req.params.id},function(err, course){
            userId = course.owner;
            Course.updateOne({_id : req.params.id}, req.body)
                .then((course) => {
                    res.redirect(`/courses/myCourses/${userId}`)
                })
                .catch(next);
        });
    }

    // xoa khoa hoc
    delete(req, res, next){
        Course.delete({_id : req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    deleteForce(req, res, next){
        Course.deleteOne({_id : req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    trash(req, res, next){
        const id = req.params.id;
        Course.findDeleted({owner: id})
            .then(courses => {
                res.render('deletedCourses', {
                    userId : id,
                    courses : multiComponents(courses)
                })
            })
            .catch(next);
    }

    // [patch] sua lai khoa hoc
    restore(req, res, next){
        Course.restore({_id : req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    
}

module.exports = new CourseController();
