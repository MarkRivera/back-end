const db = require("../data/db-config");

module.exports = async (req, res, next) => {
  const zip = req.body.zipCode;
  const isZipInDb = await db("zipcodes").where({ zipCode: zip }).first();

  try {
    if (!isZipInDb) {
      const zipId = await db("zipcodes").insert({ zipCode: zip });
      const newZip = await db("zipcodes").findById({ id });
      req.newZip = newZip;
      req.zipId = zipId;
      next();
    } else {
      req.newZip = isZipInDb;
      req.zipId = isZipInDb.id;
      next();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
