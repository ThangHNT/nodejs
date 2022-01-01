const Comment = require('../models/comment.js');
const Course = require('../models/course.js');

class CommentController {
    // store comment
    storeComment(req, res, next) {
        const courseId = req.params.id;
        const slug = req.params.slug;
        const comment = new Comment({content: req.body.content,course: courseId});
        comment.save();
        Course.findOne({_id: courseId}, function(err, course) {
            // course.comments.push(comment);      // them comment vao khoa hoc
            // course.save();
            return res.redirect(`/courses/${slug}/${courseId}/storeJSON`);
        })
    }

    // chuyển đổi data comment thành json để tạo view
    getJSON(req, res, next){
        Comment.find({course: req.params.id})
            .then((comments) => {
                comments.map((comment) =>{
                    comment.content = comment.content.replace(/\n/g,'<br>');
                })
                res.json(comments);
            })
            .catch(next);
    }

    // xoa comment
    deleteComment(req, res, next){
        const commentId = req.params.id;
        Comment.findOneAndDelete({_id: commentId}, function(err, comment){
            res.send('thanh cong');
        })
    }
}

module.exports = new CommentController;
