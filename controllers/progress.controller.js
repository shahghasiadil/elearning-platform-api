// controllers/progressController.js
const Progress = require("../models/progress.model");
const Course = require("../models/course.model");
const Lesson = require("../models/lesson.model");

exports.markLessonAsComplete = async (req, res) => {
  const { courseId, lessonId } = req.params;
  const userId = req.user._id;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const progress = await Progress.findOne({ user: userId, course: courseId });

    if (progress) {
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
        await progress.save();
      }
    } else {
      const newProgress = new Progress({
        user: userId,
        course: courseId,
        completedLessons: [lessonId],
      });
      await newProgress.save();
    }

    res.status(200).json({ message: "Lesson marked as complete" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProgressByCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const progress = await Progress.findOne({
      user: userId,
      course: courseId,
    }).populate("completedLessons");

    if (!progress) {
      return res
        .status(404)
        .json({ error: "Progress not found for the course" });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
