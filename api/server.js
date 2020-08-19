const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

server.use("/", (req, res) => {
  res.json({ message: "API up and running..." });
});

server.use("/", (error, req, res) => {
  if (process.env.DB_ENV !== "testing") console.log(error);
  res.status(500).json({ error: "Something went wrong", stack: error.stack });
});

module.exports = server;
