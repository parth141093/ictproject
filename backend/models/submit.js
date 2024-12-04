const mongoose = require('mongoose');

const submitSchema = new mongoose.Schema({
  username: { type: String, required: true },
  answers: [
    {
      i_did_well: { type: Boolean, required: true },
      sometimes_i_succeeded: { type: Boolean, required: true },
      i_need_some_exercise: { type: Boolean, required: true },
      is_emoji: { type: Boolean, default: false },
      feedback: { type: String, default: null },
      question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    },
  ],
});

module.exports = mongoose.model('Submit', submitSchema);
