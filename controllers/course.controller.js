const Course = require("../models/course.model");

// Create Course
const createCourse = async (req, res) => {
  const course = new Course({ ...req.body, createdBy: req.user._id });

  try {
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  const _id = req.params.id;

  try {
    const course = await Course.findOne({ _id });

    if (!course) {
      return res.status(404).send({ error: "Course not found." });
    }

    res.status(200).send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update course
const updateCourse = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const course = await Course.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!course) {
      return res.status(404).send({ error: "Course not found." });
    }

    updates.forEach((update) => (course[update] = req.body[update]));
    await course.save();

    res.status(200).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!course) {
      return res.status(404).send({ error: "Course not found." });
    }

    res.status(200).send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Enroll Course by Student
const enrollInCourse = async (req, res) => {
  const courseId = req.params.id;
  const studentId = req.user._id;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }

    if (course.enrolledStudents.includes(studentId)) {
      return res
        .status(400)
        .send({ error: "Student already enrolled in this course" });
    }

    course.enrolledStudents.push(studentId);
    await course.save();

    res
      .status(200)
      .send({ message: "Enrolled in course successfully", course });
  } catch (error) {
    res.status(500).send({ error: "Error enrolling in course" });
  }
};

const uploadCourseMaterial = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }

    // Save the uploaded file's path to the course materials array
    course.materials.push(req.file.path);
    await course.save();

    res.status(201).send({
      message: "Course material uploaded successfully",
      path: req.file.path,
    });
  } catch (error) {
    res.status(500).send({ error: "Error uploading course material" });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  uploadCourseMaterial,
};
