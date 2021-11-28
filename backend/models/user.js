const mongoose = require('mongoose')

const User = mongoose.model('users', {
  username: {
    type: 'String',
    unique: true,
  },
  password: String,
})

module.exports = User
