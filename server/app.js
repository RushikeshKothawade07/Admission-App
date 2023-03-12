const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn");
app.use(express.json());
const User = require("./model/userSchema");
app.use(require("./router/auth"));
const PORT = process.env.PORT;

// app.get("/about", (req, res) => {
//   res.send("This is the about page, hello world from about server");
// });
// app.get("/contact", (req, res) => {
//   res.send("This is the contact page, hello world from contact server");
// });
app.get("/signin", (req, res) => {
  res.send("This is the signin page, hello world from signin server");
});
app.get("/signup", (req, res) => {
  res.send("This is the signup page, hello world from signup server");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
