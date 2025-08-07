const express = require('express');
const router = express.Router();
const { blogmodel } = require('../Models/user');
const Blog=async(req,res)=>{
  try {
    const allBlogs =await blogmodel.find();
    
    // Send response
    res.status(201).json({
      message: "Blogs fetched successfully",
      blogs: allBlogs.map((blog) => blog.toObject())
    });
  } catch (error) {
    res.status(500).json({ message: "Not able to fetch", error });
  }
}

module.exports=Blog