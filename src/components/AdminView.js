import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

function AdminView() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [showModal, setShowModal] = useState(false);  // State to control modal visibility
  const [questionToDelete, setQuestionToDelete] = useState(null);  // Store the question to delete

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/questions");
        setQuestions(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch questions.");
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleFeedbackChange = (questionId, value) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [questionId]: value,
    }));
  };

  const handleEdit = (questionId) => {
    navigate(`/edit/${questionId}`);
  };

  const handleDelete = (questionId) => {
    setQuestionToDelete(questionId);
    setShowModal(true);  // Show the modal when delete button is clicked
  };

  const confirmDelete = () => {
    alert(`Deleting feedback for question: ${questionToDelete}`);
    setFeedback((prevFeedback) => {
      const updatedFeedback = { ...prevFeedback };
      delete updatedFeedback[questionToDelete];
      return updatedFeedback;
    });
    setShowModal(false);  // Close the modal
  };

  const cancelDelete = () => {
    setShowModal(false);  // Close the modal without deleting
  };

  if (isLoading) {
    return (
      <div className="page-wrap d-flex flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrap d-flex flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block">404</span>
              <div className="mb-4 lead">The page you are looking for was not found.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question._id}>
                <td>{question.question}</td>
                <td>
                  {question.options.i_did_well && (
                    <div
                      className={`feedback-option ${feedback[question._id] === 3 ? "selected" : ""}`}
                      onClick={() => handleFeedbackChange(question._id, 3)}
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        width="64px"
                        height="64px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#32cd37"
                      >
                        <circle cx="12" cy="12" r="10" stroke="#32cd37" strokeWidth="1.5"></circle>
                        <path
                          d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
                          stroke="#32cd37"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>
                        <path
                          d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"
                          fill="#32cd37"
                        ></path>
                        <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="#32cd37"></ellipse>
                      </svg>
                    </div>
                  )}
                </td>
                <td>
                  {question.options.sometimes_i_succeeded && (
                    <div
                      className={`feedback-option ${feedback[question._id] === 2 ? "selected" : ""}`}
                      onClick={() => handleFeedbackChange(question._id, 2)}
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        width="64px"
                        height="64px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#ff9900"
                      >
                        <circle cx="12" cy="12" r="10" stroke="#ff9900" strokeWidth="1.5"></circle>
                        <line
                          x1="9"
                          y1="16"
                          x2="15"
                          y2="16"
                          stroke="#ff9900"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></line>
                        <circle cx="9" cy="10.5" r="1.5" fill="#ff9900"></circle>
                        <circle cx="15" cy="10.5" r="1.5" fill="#ff9900"></circle>
                      </svg>
                    </div>
                  )}
                </td>
                <td>
                  {question.options.i_need_some_exercise && (
                    <div
                      className={`feedback-option ${feedback[question._id] === 1 ? "selected" : ""}`}
                      onClick={() => handleFeedbackChange(question._id, 1)}
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        width="64px"
                        height="64px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#ff0000"
                      >
                        <circle cx="12" cy="12" r="10" stroke="#ff0000" strokeWidth="1.5"></circle>
                        <path
                          d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
                          stroke="#ff0000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>
                        <path
                          d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"
                          fill="#ff0000"
                        ></path>
                        <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="#ff0000"></ellipse>
                      </svg>
                    </div>
                  )}
                </td>
                <td>
                  <button className="btn btn-secondary me-2" onClick={() => handleEdit(question._id)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(question._id)}>
                    Delete
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

      {/* Modal for Delete Confirmation */}
      {showModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelDelete}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this feedback?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelDelete}>No</button>
                <button className="btn btn-danger" onClick={confirmDelete}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminView;
