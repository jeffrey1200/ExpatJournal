const db = require("../database/dbConfig");

module.exports = {
  getAll,
  findUserById,
  addUser,
  update,
  remove,
  getUserExperiences,
};

function getAll() {
  return db("Users").select("*");
}

function getUserExperiences(id) {
  return db("Experiences").where({ user_id: id });
}

function findUserById(id) {
  return db("Users").where({ id }).first();
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
