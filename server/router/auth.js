const jwt = require("jsonwebtoken");
const express = require("express");

const router = express.Router();
const bcrypt = require("bcryptjs");

const authenticate = require("../middleware/authenticate");

const cookieParser = require("cookie-parser");
router.use(cookieParser());

require("../db/conn");
const User = require("../model/userSchema");
router.get("/", (req, res) => {
  res.send(`Hello world from the server router js`);
});

router.post("/register", async (req, res) => {
  const { name, email, phone, interests, city, password, cpassword } = req.body;
  if (
    !name ||
    !email ||
    !phone ||
    !interests ||
    !city ||
    !password ||
    !cpassword
  ) {
    return res.status(422).json({ error: "Plz fill all details" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User alreaady exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Check password" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        interests,
        city,
        password,
        cpassword,
      });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login router
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "invalid details" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: false,
      });

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      } else {
        res.json({ message: "user signin successful" });
      }
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// about us ka page
router.get("/about", authenticate, (req, res) => {
  console.log("This is the about page, hello world from about server");
  res.send(req.rootUser);
});

// home ka page and contact page
router.get("/getData", authenticate, (req, res) => {
  console.log("This is the home page, hello world from about server");
  res.send(req.rootUser);
});



// contact us page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("errorin conatact fomrm");
      return res.json({ error: "Please fill all the contact fields" });
    }
    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();

      res.status(201).json({ message: "Feedback sent successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//  logout page
router.get("/logout", (req, res) => {
  console.log("Hello my logout page");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout");
});

module.exports = router;
