const express = require('express');
const router = express.Router();
const courseController = require('../controller/CourseController.js');
const commentsController = require('../controller/CommentsController.js');

router.get('/myCourses/edit/:id',courseController.editCourse);  // tao view cho form chinh sua khoa hoc
router.put('/myCourses/:id',courseController.update);           // luu thay doi cua khoa hoc
router.patch('/:id/restore',courseController.restore);          // [patch] sua lai khoa hoc
router.get('/myCourses/trash',courseController.trash);          // view khóa học đã xóa
router.delete('/delete/:id/force',courseController.deleteForce);    // xoa khoa hoc va ko khôi phục đc nữa
router.delete('/delete/:id',courseController.delete);           // xoa khoa hoc
router.get('/myCourses', courseController.myCourses);
router.post('/create/store', courseController.storeCourse);     // luu khoa hoc moi
router.get('/create', courseController.createCourse);           // tao view cho trang dang khoa hoc
router.get('/:slug/:id/storeJSON', commentsController.getJSON); // chuyển đổi data comment thành json để tạo view
router.post('/:slug/comment/:id', commentsController.storeComment); // store comment
router.delete('/comment/:id/delete', commentsController.deleteComment); // delete comment
router.get('/:slug/:id', courseController.courseDetail);

module.exports = router;
