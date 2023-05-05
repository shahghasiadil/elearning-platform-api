const express = require('express');
const courseController = require('../controllers/course.controller');
const auth = require('../middleware/auth');
const { authorize } = require('../utils/role');

const router = new express.Router();

router.post('/', auth, authorize('instructor'), courseController.createCourse);
router.get('/', auth, courseController.getCourses);
router.get('/:id', auth, courseController.getCourseById);
router.patch('/:id', auth, authorize('instructor'), courseController.updateCourse);
router.delete('/:id', auth, authorize('instructor'), courseController.deleteCourse);

module.exports = router;