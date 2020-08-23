const jwt = require("jsonwebtoken");
const secrets = require("../api/config/secrets");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400).json({ msg: "Bad Request, missing headers!" });
  } else {
    const [authType, token] = req.headers.authorization.split(" ");
    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          console.error(err);
          res.status(401).json({ msg: "Invalid token!" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({ msg: "No token received!" });
    }
  }
};
