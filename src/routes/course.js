const express = require('express');
const router = express.Router();
const courseController = require('../controller/CourseController.js');

router.get('/myCourses/edit/:id',courseController.editCourse);
router.put('/myCourses/:id',courseController.update);
router.patch('/:id/restore',courseController.restore);
router.get('/myCourses/trash',courseController.trash);
router.delete('/delete/:id/force',courseController.deleteForce);
router.delete('/delete/:id',courseController.delete);
router.get('/myCourses', courseController.myCourses);
router.post('/create/store', courseController.storeCourse);
router.get('/create', courseController.createCourse);
router.get('/:slug/:id', courseController.courseDetail);

module.exports = router;
