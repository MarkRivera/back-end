const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");

// Custom Middleware
const restricted = require("../middleware/restricted-route");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

server.use("/api/auth", authRoutes);
server.use("/api/users", restricted, userRoutes);
server.use("/api/posts", postsRoutes);

server.use("/", (req, res) => {
  res.send("API is running!");
});

server.use("/", (error, req, res, next) => {
  if (process.env.DB_ENV !== "testing") console.error(error);
  res.status(500).json({ error: "Something went wrong" });
});

module.exports = server;
