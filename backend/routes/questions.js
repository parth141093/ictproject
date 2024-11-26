const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const Option = require('../models/option');

// Get all questions with their options
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().lean();
    const questionsWithOptions = await Promise.all(
      questions.map(async (question) => {
        const options = await Option.findOne({ question_id: question._id });
        return { ...question, options };
      })
    );
    res.json(questionsWithOptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;