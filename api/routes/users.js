const express = require("express");
const router = express.Router();
const validateZip = require("../../middleware/validate-zip");
const matchID = require("../../middleware/match-id");

// User Model
const Users = require("../../data/models/users");

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put("/:id", matchID, validateZip, async (req, res, next) => {
  try {
    const userObject = {
      email: req.body.email,
      zip_id: req.zipId,
    };
    const updatedUser = await Users.update(req.params.id, userObject);
    res.status(200).json(updatedUser[0]);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:id", matchID, async (req, res, next) => {
  try {
    const deletedUser = await Users.remove(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
