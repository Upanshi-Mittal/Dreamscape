const express = require('express');
const { blogmodel } =require( '../Models/user');

const Add=async(req,res)=>{
    try {
        const { title, content,pic} = req.body;
        const userId = req.session?.userId;
        const check=await blogmodel.findOne({title, authorUsername: userId});
        if(check){
            return res.status(409).json({message:"Blog already existed under your name"});
        }
        const blog = new blogmodel({
            title,
            content,
            date:new Date(),
            authorUsername:userId,
            likes:0,
            likedBy:[],
            pic
        });
        await blog.save();
        res.status(200).json({ message: "Blog saved", blog });
    } catch (error) {
        console.error("SAVE BLOG ERROR:", error.message);
        res.status(500).json({ message: "Failed to save blog", error: error.message });
    }
}
module.exports=Add