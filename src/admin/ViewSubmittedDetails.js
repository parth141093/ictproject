import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewSubmittedDetails() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/submit");
        setSubmissions(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch submissions.");
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleView = (submission) => {
    setSelectedSubmission(submission);
    setShowViewModal(true);
  };

  const handleDelete = (submission) => {
    setSelectedSubmission(submission);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedSubmission) return;

    try {
      await axios.delete(`http://localhost:3000/api/submit/${selectedSubmission._id}`);
      setSubmissions((prev) => prev.filter((s) => s._id !== selectedSubmission._id));
      alert("Submission deleted successfully!");
    } catch (err) {
      setError("Failed to delete the submission.");
    } finally {
      setShowDeleteModal(false);
      setSelectedSubmission(null);
    }
  };

  const cancelDelete = () => {
    setSelectedSubmission(null);
    setShowDeleteModal(false);
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
      <h2 className="text-center mb-4">Submitted Details</h2>
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td>{submission.username}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleView(submission)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(submission)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {showViewModal && selectedSubmission && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Username: {selectedSubmission.username}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h6>Answers:</h6>
                <ul>
                  {selectedSubmission.answers.map((answer, index) => (
                    <li key={index}>
                      <strong>{answer.question_name}:</strong>{" "}
                      {answer.is_emoji
                        ? answer.i_did_well
                          ? "Onnistuin hyvin"
                          : answer.sometimes_i_succeeded
                          ? "Onnistuin toisinaan"
                          : "Tarvitsen harjoitusta"
                        : answer.feedback || "No feedback provided"}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedSubmission && (
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
                  Are you sure you want to delete the submission by{" "}
                  <strong>{selectedSubmission.username}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelDelete}>
                  No
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewSubmittedDetails;
