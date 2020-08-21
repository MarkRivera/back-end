exports.up = function (knex) {
  return knex.schema
    .createTable("zipcodes", (tbl) => {
      tbl.increments("id").unsigned();
      tbl.integer("zipCode").unsigned().notNullable();
    })
    .createTable("users", (tbl) => {
      tbl.increments("id").unsigned();
      tbl.text("email").unique().notNullable();
      tbl.text("password").notNullable();
      tbl.boolean("isGovernmentOfficial").notNullable();
      tbl
        .integer("zip_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("zipcodes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("posts", (tbl) => {
      tbl.increments().unsigned();
      tbl.text("issue").notNullable();
      tbl.text("description").notNullable();
      tbl.binary("photo");
      tbl
        .integer("zip_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("zipcodes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("posts")
    .dropTableIfExists("users")
    .dropTableIfExists("zipcodes");
};
