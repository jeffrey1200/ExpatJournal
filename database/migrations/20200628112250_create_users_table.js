exports.up = function (knex) {
  return knex.schema.createTable("Users", (tbl) => {
    tbl.increments();

    tbl.string("firstName", 255).notNullable();
    tbl.string("lastName", 255).notNullable();
    tbl.string("username", 255).notNullable().unique();
    tbl.string("email", 255).notNullable().unique();
    tbl.string("password", 255).notNullable();
    tbl.integer("posts").defaultTo(0);
    tbl.integer("followers").defaultTo(0);
    tbl.integer("following").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExist("Users");
};
