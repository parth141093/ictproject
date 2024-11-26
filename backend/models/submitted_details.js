const mongoose = require('mongoose');

const submittedDetailsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  answers: [
    {
      question: { type: String, required: true },
      i_did_well: { type: Boolean, required: true },
      sometimes_i_succeeded: { type: Boolean, required: true },
      i_need_some_exercise: { type: Boolean, required: true },
      is_emoji: { type: Boolean, default: false },
      feedback: { type: String, default: null },
    },
  ],
});

module.exports = mongoose.model('SubmittedDetails', submittedDetailsSchema);
