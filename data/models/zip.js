const db = require("../db-config");

async function getAllZips() {
  return await db("zipcodes").select("id", "email").orderBy("id");
}

async function findOneBy(filter) {
  try {
    const zip = await db("zipcodes").where(filter).first();
    return zip;
  } catch (error) {
    console.error(error);
    res.json({ msg: "Error finding ZIP Code" });
  }
}

async function add(zip) {
  try {
    const newZip = await db("zipcodes").returning("id").insert(zip);
    const id = newZip[0];
    return findOneBy({ id });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getAllZips, findOneBy, add };
