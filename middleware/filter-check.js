const Posts = require("../data/models/posts");
const Zip = require("../data/models/zip");

module.exports = async (req, res, next) => {
  try {
    req.filters = {};
    if (!req.query.id && !req.query.zipCode && !req.query.zip_id) {
      res.status(400).json({ msg: "Bad request, no filters supplied" });
    }

    if (req.query.id) {
      req.filters.id = req.query.id;
    }

    if (req.query.zip_id) {
      req.filters.zip_id = req.query.zip_id;
    }

    if (req.query.zipCode) {
      const zip_id = await Zip.findOneBy({ zipCode: req.query.zipCode });
      req.filters.zip_id = zip_id.id;
    }

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
