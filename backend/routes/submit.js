const express = require('express');
const router = express.Router();
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

    // Create a new Submit entry
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
    const detailId = req.params.id;

    // Delete the submitted detail
    const deletedDetail = await Submit.findByIdAndDelete(detailId);
    if (!deletedDetail) {
      return res.status(404).json({ error: 'Detail not found' });
    }

    res.json({ message: 'Submitted detail deleted successfully', data: deletedDetail });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
