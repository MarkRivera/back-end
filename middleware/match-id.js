const e = require("express");

module.exports = (req, res, next) => {
  try {
    if (req.decodedToken && req.decodedToken.subject == req.params.id) {
      next();
    } else {
      res
        .status(400)
        .json({ msg: "Your ID does not match the user you're trying to edit" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
