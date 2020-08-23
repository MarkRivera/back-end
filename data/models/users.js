const db = require("../db-config");

async function getAllUsers() {
  return await db("users").select("id", "email").orderBy("id");
}

async function findOneBy(filter) {
  const user = await db("users").where(filter).first();
  return user;
}

async function add(user) {
  const newUser = await db("users").returning("id").insert(user);
  const id = newUser[0];
  return findOneBy({ id });
}

async function update(id, userObject) {
  const userUpdate = await db("users")
    .where({ id })
    .update(userObject, ["id", "email", "zip_id"]);
  return userUpdate;
}

async function remove(id) {
  const user = await findOneBy({ id });
  const deletedNum = await db("users").where({ id }).del();
  return user;
}

module.exports = { getAllUsers, findOneBy, add, update, remove };
