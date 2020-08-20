const knex = require("knex");
const config = require("../knexfile");
const DB_ENV = process.env.DB_ENV || "development";

const db = knex(config[DB_ENV]);

module.exports = db;
