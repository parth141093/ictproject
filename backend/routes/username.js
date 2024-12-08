const express = require('express');
const router = express.Router();
const Username = require('../models/username'); // Adjust path as per your project structure

// GET all usernames
router.get('/', async (req, res) => {
    try {
        const usernames = await Username.find();
        res.json(usernames);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new username
router.post('/', async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const newUser = new Username({ username });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Check if username exists
router.get('/:username', async (req, res) => {
    try {
        const username = req.params.username;
        console.log("username")
        console.log(username)
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const user = await Username.findOne({ username });
        if (user) {
            return res.status(200).json({ status: 'Found', user });
        } else {
            return res.status(404).json({ status: 'NotFound' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE a username by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await Username.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'Username not found' });
        }

        res.json({ message: 'Username deleted successfully', data: deletedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
