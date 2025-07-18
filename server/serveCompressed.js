// serveCompressed.js
const express = require("express");
const path = require("path");
const fs = require("fs");

const distDir = path.resolve(__dirname, "../client/_site");

const router = express.Router();

router.use((req, res, next) => {
  const acceptEncoding = req.headers["accept-encoding"] || "";
  let urlPath = req.path;
  if (urlPath === "/") urlPath = "/index.html";
  const fileBase = path.join(distDir, urlPath);

  console.log("Request:", urlPath, "Accept-Encoding:", acceptEncoding);

  if (/\.(js|css|html)$/.test(urlPath)) {
    if (acceptEncoding.includes("br") && fs.existsSync(`${fileBase}.br`)) {
      console.log("Serving Brotli:", `${fileBase}.br`);
      res.set("Content-Encoding", "br");
      res.set("Content-Type", getMimeType(urlPath));
      return res.sendFile(`${fileBase}.br`);
    }
    if (acceptEncoding.includes("gzip") && fs.existsSync(`${fileBase}.gz`)) {
      console.log("Serving Gzip:", `${fileBase}.gz`);
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

module.exports = router;

