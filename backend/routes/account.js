const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();
const User = require("../models/user");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const data = await User.create(req.body);

  req.session.username = username;
  req.session.password = password;

  res.status(201).json({ user: req.session.username });
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const data = await User.findOne({ username });

    if (data.password === password) {
      req.session.username = username;
      req.session.password = password;

      res.status(200).json({ user: req.session.username });
    } else {
      throw new Error("Wrong credentials");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/isLoggedIn", isAuthenticated, (req, res) => {
  res.json({ user: req.session.username });
});

router.post("/logout", isAuthenticated, (req, res) => {
  req.session.username = null;
  req.session.password = null;
  res.send("ok");
});

module.exports = router;
