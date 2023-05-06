const express = require("express");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");
const { authorize } = require("../utils/role");

const router = new express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getProfile);
router.patch("/me", auth, userController.updateProfile);
router.delete("/me", auth, userController.deleteProfile);
router.get("/users", auth, authorize("admin"), userController.getUsers);
router.get(
  "/instructors/:id/courses",
  auth,
  authorize("instructor"),
  userController.getInstructorCourses
);
router.get("/leaderboard", userController.getLeaderboard);
module.exports = router;
