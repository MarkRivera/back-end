const express = require("express");
const Posts = require("../data/models/posts");

module.exports = async (req, res, next) => {
  try {
    const postID = await Posts.getPostBy({ id: req.params.id });
    console.log(postID.user_id);
    if (req.decodedToken && req.decodedToken.subject == postID.user_id) {
      next();
    } else {
      res.status(400).json({
        msg: "Your ID does not match the post user id you're trying to edit",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
