const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../../data/models/users");
const validateRegistration = require("../../middleware/validate-registration");
const validateZip = require("../../middleware/validate-zip");

const secrets = require("../config/secrets");

router.post(
  "/register",
  validateRegistration,
  validateZip,
  async (req, res, next) => {
    const { email, password, isGovernmentOfficial } = req.validRegistration;

    try {
      const user = await Users.findOneBy({ email });
      if (user) {
        res
          .status(400)
          .json({ messsage: "A user with that email already exists!" });
      } else {
        const hash = await bcrypt.hash(password, 14);

        const userObject = {
          email,
          password: hash,
          isGovernmentOfficial,
          zip_id: req.zipId,
        };

        // Save User
        const newUser = await Users.add(userObject);
        res.status(201).json(newUser);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOneBy({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid User Creds!" });
  } else {
    try {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome!`, token });
      } else {
        return res.status(401).json({ message: "Invalid User Creds!" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
});

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: "8h",
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
};

module.exports = router;
