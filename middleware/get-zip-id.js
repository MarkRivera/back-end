const Zip = require("../data/models/zip");

module.exports = async (req, res, next) => {
  try {
    if (req.filters.zip_id) {
      const zip_id = await Zip.findOneBy({
        zipCode: parseInt(req.filters.zip_id),
      });
      req.filters.zip_id = zip_id.id;
      next();
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
