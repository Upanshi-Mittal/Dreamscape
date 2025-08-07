const express = require('express');
const router = express.Router();
const { blogmodel } = require('../Models/user');

const comments=async(req,res)=>{
    try {
        const blog=await blogmodel.findById(req.params.id);
        const userId = req.userId;
         const newComment = {
            comment: req.body.comment,
            user: userId,
            createdAt: new Date(),
        };
        blog.comments.push(newComment);
        await blog.save();
        res.status(200).json({message:"comment added"});
        
    } 
    catch (error) {
        console.error("COMMENT ERROR:", error.message);
        res.status(500).json({ message: "Failed to add comment", error: error.message });
    }
}

module.exports = comments;