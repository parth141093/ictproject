import React, { useState } from "react";

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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Työelämään valmentautumisen yleiset tavoitteet</h2>
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Question</th>
              <th>Onnistuin hyvin</th>
              <th>Onnistuin toisinaan</th>
              <th>Tarvitsen harjoitusta</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td>{question}</td>
                <td>
                  <button
                    className={`btn btn-success ${feedback[index] === 1 ? "active" : ""}`}
                    onClick={() => handleFeedbackChange(index, 1)}
                  >
                    😊
                  </button>
                </td>
                <td>
                  <button
                    className={`btn btn-warning ${feedback[index] === 0 ? "active" : ""}`}
                    onClick={() => handleFeedbackChange(index, 0)}
                  >
                    😐
                  </button>
                </td>
                <td>
                  <button
                    className={`btn btn-danger ${feedback[index] === -1 ? "active" : ""}`}
                    onClick={() => handleFeedbackChange(index, -1)}
                  >
                    😟
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary">Seuraava Sivu</button>
      </div>
    </div>
  );
}

export default FeedbackForm;
