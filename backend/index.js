const express = require('express');
const mongoose = require('mongoose');
const questionsRoute = require('./routes/questions'); // Adjust the path as needed
const MongodbUrl = require('./const');

const app = express();

// Middleware
app.use(express.json());

// Use the /questions route
app.use('/questions', questionsRoute);

// Connect to MongoDB and start the server
mongoose
  .connect(MongodbUrl)
  .then(() => {
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));