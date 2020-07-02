const db = require("../database/dbConfig");

module.exports = {
  getAll,
  findUserById,
  addUser,
  update,
  remove,
  findUserByUsername,
};

function getAll() {
  return db("Users").select("*");
}

function findUserById(id) {
  return db("Users").where({ id }).select("*");
}

function findUserByUsername(username) {
  return db("Users").where({ username }).first();
}

async function addUser(user) {
  const [newUser] = await db("Users").insert(user, "*");
  return newUser;
}

function update(id, changes) {
  return db("Users").where({ id }).update(changes, "*");
}

function remove(id) {
  return db("Users").where({ id }).del();
}
