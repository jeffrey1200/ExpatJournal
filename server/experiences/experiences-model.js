const db = require("../database/dbConfig");
module.exports = { getAll, getById, insert, update, remove };

function getAll() {
  return db("Experiences").select("*");
}
function getById(id) {
  return db("Experiences").where({ id }).first();
}

async function insert(post) {
  return await db("Experiences").insert(post, "*");
}

function update(id, changes) {
  return db("Experiences").where({ id }).update(changes, "*");
}

function remove(id) {
  return db("Experiences").where({ id }).del();
}
