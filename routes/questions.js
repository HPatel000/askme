const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
const { check, validationResult } = require('express-validator');

const Question = require('../models/Question');

// @route GET api/questions
// @desc Get all users questions
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const questions = await Question.find({ user: req.user.id }).sort({ date: -1 });
    res.json(questions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/questions
// @desc Add new question
// @access Private
router.post('/', [auth, [
  check('que', 'Question is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { que } = req.body;
  try {
    const newQuestion = new Question({
      que,
      user: req.user.id
    });

    const question = await newQuestion.save();

    res.json(question);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');

  }
});

// @route PUT api/questions/:id
// @desc Update question
// @access Private
router.put('/:id', async (req, res) => {
  const { que } = req.body;

  // Build contact object
  const questionFields = {};
  if (que) questionFields.que = que;

  try {
    let question = await Question.findById(req.params.id);

    if (!question) return res.status(404).json({ msg: 'Question not found' });

    question = await Question.findByIdAndUpdate(
      req.params.id,
      { $set: questionFields },
      { new: true },
    );

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/questions/:id
// @desc DELETE question
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let question = await Question.findById(req.params.id);

    if (!question) return res.status(404).json({ msg: 'Question not found' });

    // Make sure user owns question
    if (question.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Question.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Question removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;