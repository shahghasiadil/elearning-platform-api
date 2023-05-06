const express = require("express");
const router = express.Router({ mergeParams: true });
const forumController = require("../controllers/fourm.controller");
const auth = require("../middlewares/auth");

router.use(auth);

router.post("/", forumController.createPost);
router.get("/", forumController.getPosts);
router.get("/search", forumController.searchPosts);
router.put("/:postId", forumController.updatePost);
router.patch("/:postId/vote", forumController.votePost);
router.patch("/:postId/accept", forumController.acceptAnswer);

module.exports = router;
