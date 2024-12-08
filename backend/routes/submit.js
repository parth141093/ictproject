const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Submit = require('../models/submit');

// Get all submitted details
router.get('/', async (req, res) => {
  try {
    const allDetails = await Submit.find();
    res.json(allDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new detail
router.post('/', async (req, res) => {
  try {
    const { username, answers } = req.body;

    // Basic validation for required fields
    if (!username || !answers) {
      return res.status(400).json({ error: 'Username and answers are required' });
    }

    const newDetails = new Submit({ username, answers });
    const savedDetails = await newDetails.save();

    res.status(201).json({ message: 'Submitted details added successfully', data: savedDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a specific submitted detail by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const deletedDetail = await Submit.findByIdAndDelete(id);
    if (!deletedDetail) {
      return res.status(404).json({ error: 'Detail not found' });
    }

    res.json({ message: 'Submitted detail deleted successfully', data: deletedDetail });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
