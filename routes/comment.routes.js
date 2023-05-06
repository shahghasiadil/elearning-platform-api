const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middlewares/auth");
const commentController = require("../controllers/forumComments.controller");

// Create comment
router.post("/", auth, commentController.createComment);

// Update comment
router.put("/:commentId", auth, commentController.updateComment);

// Delete comment
router.delete("/:commentId", auth, commentController.deleteComment);

// Get comments by post
router.get("/", commentController.getCommentsByPost);

module.exports = router;
