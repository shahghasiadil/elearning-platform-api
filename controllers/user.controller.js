const User = require("../models/user.model");
const Course = require("../models/course.model");
const dotenv = require("dotenv");

dotenv.config();

// Register a new user
const registerUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Log in an existing user
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await user.verifyPassword(req.body.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Get the user's profile
const getProfile = async (req, res) => {
  res.send(req.user.toJSON());
};

// Update the user's profile
const updateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "role"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user.toJSON());
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete the user's profile
const deleteProfile = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all users (admin only)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getInstructorCourses = async (req, res) => {
  const instructorId = req.params.id;

  try {
    const instructor = await User.findById(instructorId).select(
      "-password -tokens"
    );

    if (!instructor) {
      return res.status(404).send({ error: "Instructor not found" });
    }

    const courses = await Course.find({ createdBy: instructor._id });
    res.status(200).send({ instructor, courses });
  } catch (error) {
    res.status(500).send({ error: "Error fetching instructor courses" });
  }
};
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .select("name points badges")
      .populate("badges")
      .sort({ points: -1 }); // Sort by points in descending order

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteProfile,
  getUsers,
  getInstructorCourses,
  getLeaderboard,
};
