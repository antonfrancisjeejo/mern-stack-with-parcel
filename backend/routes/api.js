const express = require("express");

const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Question = require("../models/questions");

router.get("/questions", async (req, res, next) => {
  try {
    const data = await Question.find({});
    res.status(200).send(data);
  } catch (error) {
    next(error.message);
  }
});

router.post("/questions/add", isAuthenticated, async (req, res, next) => {
  try {
    const question = {
      questionText: req.body.question,
      author: req.session.username,
    };
    const data = await Question.create(question);
    res.status(201).send(data);
  } catch (error) {
    next(error.message);
  }
});

router.post("/questions/answer", isAuthenticated, async (req, res, next) => {
  try {
    const data = await Question.findByIdAndUpdate(
      { _id: req.body.id },
      { answer: req.body.answer },
      { new: true }
    );
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    next(error.message);
  }
});

module.exports = router;
