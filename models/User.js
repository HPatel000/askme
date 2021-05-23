const mongoose = require('mongoose')

const Userschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likedAnswers: {
    type: [mongoose.Schema.Types.ObjectId],
  },
})

module.exports = mongoose.model('User', Userschema)
