const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  choice_of_question: { type: Number, required: true },
  question: { type: String, required: true },
  image: { type: String, default: null },
});

module.exports = mongoose.model('Question', questionSchema);