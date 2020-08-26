const Zip = require("../data/models/zip");

module.exports = async (req, res, next) => {
  try {
    const zip = req.body.zipCode;
    const isZipInDb = await Zip.findOneBy({ zipCode: zip });

    if (!isZipInDb) {
      const zipId = await Zip.add(zip);
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
