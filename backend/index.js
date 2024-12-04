const express = require('express');
const mongoose = require('mongoose');
const questionsRoute = require('./routes/questions'); // Adjust the path as needed
const submitRoute = require('./routes/submit');
const MongodbUrl = require('./const');

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Use the /questions route
app.use('/api/questions', questionsRoute);
app.use('/api/submit', submitRoute);

// Connect to MongoDB and start the server
mongoose
  .connect(MongodbUrl)
  .then(() => {
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));