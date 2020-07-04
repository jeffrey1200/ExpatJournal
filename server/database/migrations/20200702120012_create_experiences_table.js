exports.up = function (knex) {
  return knex.schema.createTable("Experiences", (tbl) => {
    tbl.increments();

    tbl.text("title", 100).notNullable();
    tbl.text("body", 300).notNullable();
    tbl.timestamp("creation_date").defaultTo(knex.fn.now()).notNullable();

    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Experiences");
};
