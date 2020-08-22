const Zip = require("../data/models/zip");

module.exports = async (req, res, next) => {
  const zip = req.body.zipCode;
  const isZipInDb = Zip.findOneBy({ zipCode: zip });

  try {
    if (!isZipInDb) {
      const zipId = Zip.add(zip);
      req.zipId = zipId;
      next();
    } else {
      req.zipId = isZipInDb.id;
      next();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
