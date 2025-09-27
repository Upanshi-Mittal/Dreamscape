const express = require('express');
const router = express.Router();
const { blogmodel } = require('../Models/user');

const comments = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await blogmodel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const username = req.session?.userId || req.body.userId || "Anonymous"; // fallback
    const commentText = req.body.text;

    if (!commentText) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const newComment = {
      username,
      text: commentText,
      date: new Date()
    };

    blog.comments.push(newComment);
    await blog.save();

    res.status(200).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    console.error("COMMENT ERROR:", error.message);
    res.status(500).json({ message: "Failed to add comment", error: error.message });
  }
};

module.exports = comments;