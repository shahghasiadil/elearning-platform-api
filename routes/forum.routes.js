const express = require("express");
const router = express.Router({ mergeParams: true });
const forumController = require("../controllers/fourm.controller");
const auth = require("../middlewares/auth");
const commentRoutes = require("../routes/comment.routes");

router.post("/", auth, forumController.createPost);
router.get("/", forumController.getPosts);
router.get("/search", forumController.searchPosts);
router.put("/:postId", auth, forumController.updatePost);
router.patch("/:postId/vote", auth, forumController.votePost);
router.patch("/:postId/accept", auth, forumController.acceptAnswer);
router.use("/:postId/comments", commentRoutes);
module.exports = router;
