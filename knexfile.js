require("dotenv").config({ path: "./" });

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "1StarPopSuper",
      database: "comake",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      min: 2,
      max: 10,
    },

    testing: {
      client: "pg",
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: "./data/migrations",
      },
      seeds: {
        directory: "./data/seeds",
      },
      pool: {
        min: 2,
        max: 10,
      },
    },

    production: {
      client: "pg",
      connection: process.env.DATABASE_URL,
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: "knex_migrations",
      },
    },
  },
};
