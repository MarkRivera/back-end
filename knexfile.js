// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run(`PRAGMA foreign_keys = ON`, done);
      },
    },

    testing: {
      client: "postgresql",
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: "./data/migrations",
      },
      seeds: {
        directory: "./data/seeds",
      },
      pool: {
        afterCreate: (conn, done) => {
          conn.run(`PRAGMA foreign_keys = ON`, done);
        },
      },
    },

    production: {
      client: "postgresql",
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
