const express = require("express");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
require("dotenv").config();

// ==== Setup ====
const app = express();
//const distDir = path.resolve(__dirname, "../client/_site");
const distDir = path.resolve(__dirname, "public");

// ==== Middleware ====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
}));

// ==== Compression Middleware ====
app.use((req, res, next) => {
  const acceptEncoding = req.headers["accept-encoding"] || "";
  let urlPath = req.path;
  if (urlPath === "/") urlPath = "/index.html";
  const fileBase = path.join(distDir, urlPath);

  if (/\.(js|css|html)$/.test(urlPath)) {
    if (acceptEncoding.includes("br") && fs.existsSync(`${fileBase}.br`)) {
      res.set("Content-Encoding", "br");
      res.set("Content-Type", getMimeType(urlPath));
      return res.sendFile(`${fileBase}.br`);
    }
    if (acceptEncoding.includes("gzip") && fs.existsSync(`${fileBase}.gz`)) {
      res.set("Content-Encoding", "gzip");
      res.set("Content-Type", getMimeType(urlPath));
      return res.sendFile(`${fileBase}.gz`);
    }
  }

  next();
});

function getMimeType(file) {
  if (file.endsWith(".js")) return "application/javascript";
  if (file.endsWith(".css")) return "text/css";
  if (file.endsWith(".html")) return "text/html";
  return "application/octet-stream";
}

// ==== PostgreSQL Setup ====
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// ==== Auth Middleware ====
function ensureAuth(req, res, next) {
  if (req.session.user) return next();
  res.status(401).send("Unauthorized");
}

// ==== Auth Routes (/api/*) ====
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hash]);
    res.send("User registered");
  } catch (err) {
    res.status(400).send("User may already exist");
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  if (result.rows.length === 0) return res.status(400).send("User not found");

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    req.session.user = { id: user.id, username: user.username };
    res.send("Logged in");
  } else {
    res.status(401).send("Incorrect password");
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send("Logout failed");
    res.send("Logged out");
  });
});

app.get("/api/profile", ensureAuth, (req, res) => {
  res.send(`Welcome ${req.session.user.username}`);
});

// ==== Serve Static Frontend ====
app.use(express.static(distDir));


// ==== SPA Fallback ====
app.get("*", (req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

// ==== Start Server ====
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
