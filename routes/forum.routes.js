const express = require("express");
const router = express.Router({ mergeParams: true });
const forumController = require("../controllers/fourm.controller");
const auth = require("../middlewares/auth");

router.post("/", auth, forumController.createPost);
router.get("/", forumController.getPosts);
router.get("/search", forumController.searchPosts);
router.put("/:postId", auth, forumController.updatePost);
router.patch("/:postId/vote", auth, forumController.votePost);
router.patch("/:postId/accept", auth, forumController.acceptAnswer);

module.exports = router;
