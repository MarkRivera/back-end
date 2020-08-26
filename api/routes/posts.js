const express = require("express");
const router = express.Router();
const Posts = require("../../data/models/posts");

// GET ALL POSTS
router.get("/", async (req, res, next) => {
  try {
  const posts = await Posts.getPosts();
   res.status(200).json(posts); 
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET ONE POST


// CREATE A POST


// UPDATE A POST


// DELETE A POST

module.exports = router;
