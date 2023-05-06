const express = require("express");
const courseController = require("../controllers/course.controller");
const auth = require("../middlewares/auth");
const { authorize } = require("../utils/role");
const upload = require("../middlewares/multerConfig");
const router = new express.Router();

router.use(auth);

router.post("/", authorize("instructor"), courseController.createCourse);
router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourseById);
router.patch("/:id", authorize("instructor"), courseController.updateCourse);
router.delete("/:id", authorize("instructor"), courseController.deleteCourse);

router.post(
  "/:id/enroll",
  authorize("student"),
  courseController.enrollInCourse
);

// Route to upload course material (Instructor only)
router.post(
  "/:id/materials",
  authorize("instructor"),
  upload.single("materials"),
  courseController.uploadCourseMaterial
);

router.get("/:courseId/lessons", courseController.getCourseLessons);
router.post("/:courseId/lessons", courseController.createLesson);
router.get("/:courseId/lessons/:lessonId", courseController.getLesson);
router.patch("/:courseId/lessons/:lessonId", courseController.updateLesson);
router.delete("/:courseId/lessons/:lessonId", courseController.deleteLesson);

module.exports = router;
