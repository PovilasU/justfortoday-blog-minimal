const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/auth");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: false,
}));

// Mount the auth routes at /api
app.use("/api", authRoutes);

// Optionally serve frontend
app.use(express.static(path.resolve(__dirname, "../client/_site")));

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
