const mongoose = require('mongoose')

const Question = mongoose.model('questions', {
  questionText: String,
  answer: String,
  author: String,
})

module.exports = Question
