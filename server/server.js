const express = require("express");
const serveCompressed = require("./serveCompressed");
const path = require("path");

const app = express();

app.use(serveCompressed);
//app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(express.static(path.resolve(__dirname, "../client")));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
