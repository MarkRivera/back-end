const express = require("express");
const router = express.Router();
const Posts = require("../../data/models/posts");

// Middleware
const getZipId = require("../../middleware/get-zip-id");
const filterCheck = require("../../middleware/filter-check");
const matchUserPostID = require("../../middleware/match-post-id");

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
router.get("/filter", filterCheck, getZipId, async (req, res, next) => {
  try {
    const filters = req.filters;
    const post = await Posts.getPostBy(filters);
    res.status(200).json({ msg: "Test", post });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// CREATE A POST

router.post("/create", async (req, res, next) => {
  try {
    const data = req.body;
    const createdPost = await Posts.addPost(data);
    res.status(201).json(createdPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// UPDATE A POST
router.put("/:id", matchUserPostID, async (req, res, next) => {
  try {
    const postObject = {
      issue: req.body.issue,
      description: req.body.description,
      photo: req.body.photo,
      zip_id: req.body.zip,
    };
    const updatedPost = await Posts.updatePost(req.params.id, postObject);
    res.status(200).json(updatedPost[0]);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE A POST
router.delete("/:id", matchUserPostID, async (req, res, next) => {
  try {
    const deletedPost = await Posts.remove(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
