const express = require("express");

require("dotenv").config();

const { PORT } = process.env;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`server running on ${PORT}`);
});
