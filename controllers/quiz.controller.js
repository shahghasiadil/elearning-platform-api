const Quiz = require("../models/quiz.model");
const Course = require("../models/course.model");

const createQuiz = async (req, res) => {
  const quiz = new Quiz({ ...req.body, course: req.params.courseId });

  try {
    await quiz.save();
    res.status(201).send(quiz);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getQuizzesByCourse = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ course: req.params.courseId });
    res.send(quizzes);
  } catch (error) {
    res.status(500).send();
  }
};

const attemptQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).send({ error: "Quiz not found" });
    }
    const courseId = quiz.course._id;
    const studentId = req.user._id;
    const course = await Course.findById(courseId);

    if (!course.enrolledStudents.includes(studentId)) {
      return res.status(403).send({
        error: "You must be enrolled in the course to attempt the quiz",
      });
    }
    const answers = req.body.answers;
    const totalQuestions = quiz.questions.length;
    let correctAnswers = 0;

    for (let i = 0; i < totalQuestions; i++) {
      if (answers[i] === quiz.questions[i].correctAnswer) {
        correctAnswers++;
      }
    }

    const score = (correctAnswers / totalQuestions) * 100;

    quiz.attempts.push({ student: req.user._id, score });
    await quiz.save();

    res.status(200).send({ message: "Quiz attempted successfully", score });
  } catch (error) {
    res.status(500).send({ error: "Error attempting quiz" });
  }
};

module.exports = {
  createQuiz,
  getQuizzesByCourse,
  attemptQuiz,
};
