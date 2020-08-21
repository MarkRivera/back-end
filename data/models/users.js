const db = require("../db-config");

function getAllUsers() {
  return db("users").select("id", "email").orderBy("id");
}

function findOneBy(filter) {
  return db("users").where(filter).first();
}

async function add(user) {
  const newUser = await db("users").returning("id").insert(user);
  const id = newUser[0];
  return findOneBy({ id });
}

module.exports = { getAllUsers, findOneBy, add };
