const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  i_did_well: { type: Boolean, required: true },
  sometimes_i_succeeded: { type: Boolean, required: true },
  i_need_some_exercise: { type: Boolean, required: true },
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
});

module.exports = mongoose.model('Option', optionSchema);
