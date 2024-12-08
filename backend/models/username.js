const mongoose = require('mongoose');

const usernameSchema = new mongoose.Schema({
  username: { type: String, required: true },
});

module.exports = mongoose.model('Username', usernameSchema);