const Zip = require("../data/models/zip");

module.exports = async (req, res, next) => {
  try {
    if (req.body.zipCode) {
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
