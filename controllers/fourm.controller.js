const ForumPost = require("../models/forumPost.model");

const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const newPost = new ForumPost({
      title,
      content,
      tags,
      createdBy: req.user._id,
      course: req.params.courseId,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find({
      course: req.params.courseId,
    }).populate("createdBy", "name");
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchPosts = async (req, res) => {
  try {
    const { tags } = req.query;
    let query = { course: req.params.courseId };

    if (tags) {
      const tagArray = tags.split(",").map((tag) => tag.trim());
      query.tags = { $in: tagArray };
    }

    const posts = await ForumPost.find(query).populate("createdBy", "name");
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const updatedPost = await ForumPost.findOneAndUpdate(
      { _id: req.params.postId, createdBy: req.user._id },
      { title, content, tags },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found or you do not have permission to edit it.",
      });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const votePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingVote = post.votes.find(
      (v) => v.user.toString() === req.user._id.toString()
    );
    if (existingVote) {
      existingVote.vote = req.body.vote;
    } else {
      post.votes.push({ user: req.user._id, vote: req.body.vote });
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const acceptAnswer = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.acceptedAnswer = req.body.accepted;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  searchPosts,
  updatePost,
  votePost,
  acceptAnswer,
};
