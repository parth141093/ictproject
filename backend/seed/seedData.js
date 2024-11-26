const mongoose = require('mongoose');
const Question = require('../models/question');
const Option = require('../models/option');
const MongodbUrl = require('../const');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MongodbUrl);
    console.log('Connected to MongoDB!');

    // Default questions
    const questions = [
      "Tutustuin erilaisiin työtehtäviin",
      "Sain käytännön työkokemusta",
      "Tunnistan vahvuuteni",
      "Tunnistan tuen tarpeeni",
      "Annoin toisille työrauhan",
      "Muistin hyvät tavat",
      "Huolehdin tavaroistani",
      "Toimin ryhmän jäsenenä",
      "Noudatin työaikoja",
    ];

    // Clear existing data
    await Question.deleteMany({});
    await Option.deleteMany({});

    // Insert questions and options
    for (let i = 0; i < questions.length; i++) {
      const question = new Question({ choice_of_question: i + 1, question: questions[i] });
      await question.save();

      const option = new Option({
        i_did_well: true,
        sometimes_i_succeeded: true,
        i_need_some_exercise: true,
        question_id: question._id,
      });
      await option.save();
    }

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedData();
