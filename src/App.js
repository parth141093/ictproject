import React, { useState } from "react";
import "./FeedbackForm.css"; // Create a separate CSS file for styles if needed

// FeedbackForm Component
function FeedbackForm() {
  // Questions in the form
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

  // State to store selected feedback (e.g., good: 1, neutral: 0, needs improvement: -1)
  const [feedback, setFeedback] = useState(
    Array(questions.length).fill(null)
  );

  // Handler for feedback selection
  const handleFeedbackChange = (index, value) => {
    const newFeedback = [...feedback];
    newFeedback[index] = value;
    setFeedback(newFeedback);
  };

  return (
    <div className="feedback-form">
      <h2>Työelämään valmentautumisen yleiset tavoitteet</h2>
      <div className="form-table">
        <div className="table-header">
          <span>Question</span>
          <span>Onnistuin hyvin</span>
          <span>Onnistuin toisinaan</span>
          <span>Tarvitsen harjoitusta</span>
        </div>

        {questions.map((question, index) => (
          <div className="table-row" key={index}>
            <span className="question">{question}</span>
            <div className="options">
              <button
                className={`option-button ${feedback[index] === 1 ? "selected good" : ""}`}
                onClick={() => handleFeedbackChange(index, 1)}
              >
                😊
              </button>
              <button
                className={`option-button ${feedback[index] === 0 ? "selected neutral" : ""}`}
                onClick={() => handleFeedbackChange(index, 0)}
              >
                😐
              </button>
              <button
                className={`option-button ${feedback[index] === -1 ? "selected bad" : ""}`}
                onClick={() => handleFeedbackChange(index, -1)}
              >
                😟
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="submit-button">Seuraava Sivu</button>
    </div>
  );
}

export default FeedbackForm;
