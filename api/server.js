//framework and utilities
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// initializing server

const server = express();

//applying helmet,cors and json reader to the server

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "server is running!" });
});

module.exports = server;
