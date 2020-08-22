const db = require("../db-config");

function getAllZips() {
  return db("zipcodes").select("id", "email").orderBy("id");
}

function findOneBy(filter) {
  return db("zipcodes").where(filter).first();
}

async function add(zip) {
  const newZip = await db("zipcodes").returning("id").insert(zip);
  const id = newZip[0];
  return findOneBy({ id });
}

module.exports = { getAllZips, findOneBy, add };
