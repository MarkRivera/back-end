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
  }
}

async function add(zip) {
  try {
    const newZip = await db("zipcodes").returning("id").insert(zip);
    console.log(zip, newZip);
    const id = newZip[0];
    return findOneBy({ id });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getAllZips, findOneBy, add };
