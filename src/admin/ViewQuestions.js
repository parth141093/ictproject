import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RedIcon from '../components/Icons/RedIcon';
import YellowIcon from '../components/Icons/YellowIcon';
import GreenIcon from '../components/Icons/GreenIcon';

function ViewQuestions() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/questions");
        setQuestions(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch questions.");
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleEdit = (questionId) => {
    navigate(`/admin/questions/edit/${questionId}`);
  };

  const handleAdd = () => {
    navigate(`/admin/questions/add`);
  };

  const handleDelete = (questionId) => {
    setQuestionToDelete(questionId);
    setShowModal(true); // Show the modal when delete button is clicked
  };

  const confirmDelete = async () => {
    if (!questionToDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/questions/${questionToDelete}`);

      // Remove the deleted question from the local state
      setQuestions((prevQuestions) => prevQuestions.filter(q => q._id !== questionToDelete));

      alert("Question deleted successfully!");
    } catch (err) {
      setError("Failed to delete the question.");
    } finally {
      setShowModal(false);
      setQuestionToDelete(null);
    }
  };

  const cancelDelete = () => {
    setQuestionToDelete(null);
    setShowModal(false); // Close the modal without deleting
  };

  if (isLoading) {
    return (
      <div className="loading text-center">
        <h1>Loading...</h1>
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
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary me-2" onClick={() => handleAdd()}>
            Add Question
          </button>
        </div>
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
                    <GreenIcon />
                  )}
                </td>
                <td>
                  {question.options.sometimes_i_succeeded && (
                    <YellowIcon />
                  )}
                </td>
                <td>
                  {question.options.i_need_some_exercise && (
                    <RedIcon />
                  )}
                </td>
                <td>
                  <button className="btn btn-success" onClick={() => handleEdit(question._id)}>
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

      {/* Modal for Delete Confirmation */}
      {showModal && questionToDelete && (
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
                <p>
                  Are you sure you want to delete{" "}
                  <strong>
                    {questions.find((q) => q._id === questionToDelete)?.question}
                  </strong>
                  ?
                </p>
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

export default ViewQuestions;
