const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const progressController = require("../controllers/progress.controller");

router.post(
  "/courses/:courseId/lessons/:lessonId/complete",
  auth,
  progressController.markLessonAsComplete
);
router.get(
  "/courses/:courseId/progress",
  auth,
  progressController.getProgressByCourse
);

module.exports = router;
