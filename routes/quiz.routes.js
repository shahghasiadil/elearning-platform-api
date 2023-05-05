const express = require("express");
const quizController = require("../controllers/quiz.controller");
const auth = require("../middlewares/auth");
const { authorize } = require("../utils/role");

const router = new express.Router();

router.post(
  "/courses/:courseId/quizzes",
  auth,
  authorize("instructor"),
  quizController.createQuiz
);
router.get(
  "/courses/:courseId/quizzes",
  auth,
  quizController.getQuizzesByCourse
);
router.post(
  "/quizzes/:quizId/attempt",
  auth,
  authorize("student"),
  quizController.attemptQuiz
);
module.exports = router;
