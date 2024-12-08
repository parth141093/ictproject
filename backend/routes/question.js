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

// Get a question with their options
router.get('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;

    // Fetch the question by ID
    const question = await Question.findById(questionId).lean();
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Fetch the options associated with the question
    const options = await Option.findOne({ question_id: questionId }).lean();

    if (!options) {
      return res.status(404).json({ error: 'Options not found' });
    }

    // Combine the data
    res.json({ ...question, options });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a question with their options
router.post('/', async (req, res) => {
  try {
    const { choice_of_question, question, image, options } = req.body;

    // Create the question
    const newQuestion = new Question({ choice_of_question, question, image });
    const savedQuestion = await newQuestion.save();

    // Create associated options
    if (options && typeof options === "object") {
      const optionsData = {
        ...options,
        question_id: savedQuestion._id,
      };
      await Option.create(optionsData);
    }

    res.status(201).json({ message: 'Question and options created successfully', question: savedQuestion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a question with their options
router.put('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const { choice_of_question, question, image, options } = req.body;

    // Update the question
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { choice_of_question, question, image },
      { new: true } // Return the updated document
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Update associated options if provided
    if (options && typeof options === 'object') {
      // Delete old options and insert new ones (since we're using a single object for options)
      await Option.deleteMany({ question_id: questionId });
      const optionsData = {
        ...options,
        question_id: questionId,
      };
      await Option.create(optionsData);  // Using Option.create since we're sending a single object, not an array
    }

    res.json({ message: 'Question and options updated successfully', question: updatedQuestion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a question with their options
router.delete('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;

    // Delete the question
    const deletedQuestion = await Question.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Delete associated options
    await Option.deleteMany({ question_id: questionId });

    res.json({ message: 'Question and options deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;