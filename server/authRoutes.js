const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Auth API
app.use("/api", authRoutes);

module.exports = app;
