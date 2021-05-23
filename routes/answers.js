const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')
const { check, validationResult } = require('express-validator')

const Answer = require('../models/Answer')

// @route GET api/answers
// @desc Get all questions answers
// @access Private
router.get('/:id', async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.id }).sort({
      date: -1,
    })
    res.json(answers)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route POST api/answers
// @desc Add new answer
// @access Private
router.post(
  '/:id',
  [auth, [check('ans', 'Answer is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { ans } = req.body
    try {
      const newAnswer = new Answer({
        ans,
        question: req.params.id,
        user: req.user.id,
        likeCount: 0,
      })

      const answer = await newAnswer.save()
      res.json(answer)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route PUT api/answers/:id
// @desc Update answer
// @access Private
router.put('/:id', async (req, res) => {
  const { ans, likeCount } = req.body

  // Build answer object
  const answerFields = {}
  if (ans) answerFields.ans = ans
  if (likeCount) answerFields.likeCount = likeCount

  try {
    let answer = await Answer.findById(req.params.id)
    if (!answer) return res.status(404).json({ msg: 'Answer not found' })
    answer = await Answer.findByIdAndUpdate(
      req.params.id,
      { $set: answerFields },
      { new: true }
    )
    res.json(answer)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route DELETE api/answers/:id
// @desc DELETE answer
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let answer = await Answer.findById(req.params.id)
    if (!answer) return res.status(404).json({ msg: 'Answer not found' })
    // Make sure user owns answer
    if (answer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }
    await Answer.findByIdAndRemove(req.params.id)
    res.json({ msg: 'Answer removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
