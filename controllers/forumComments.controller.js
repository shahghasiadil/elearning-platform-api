const Comment = require("../models/forumComment.model");

// Create comment
async function createComment(req, res) {
  try {
    const { content } = req.body;
    const newComment = new Comment({
      content,
      createdBy: req.user._id,
      post: req.params.postId,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update comment
async function updateComment(req, res) {
  try {
    const { content } = req.body;
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId, createdBy: req.user._id },
      { content },
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      return res.status(404).json({
        message: "Comment not found or you do not have permission to edit it.",
      });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete comment
async function deleteComment(req, res) {
  try {
    const deletedComment = await Comment.findOneAndDelete({
      _id: req.params.commentId,
      createdBy: req.user._id,
    });

    if (!deletedComment) {
      return res.status(404).json({
        message:
          "Comment not found or you do not have permission to delete it.",
      });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get comments by post
async function getCommentsByPost(req, res) {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Exports at the end of the file
module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPost,
};
