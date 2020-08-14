const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'questions'
  },
  ans: {
    type: String,
    required: true
  },
  likeCount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Answer', AnswerSchema);