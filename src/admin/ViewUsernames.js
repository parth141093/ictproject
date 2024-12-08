import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewUsernames() {
  const [usernames, setUsernames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [usernameToDelete, setUsernameToDelete] = useState(null);
  const [newUsername, setNewUsername] = useState("");

  // Fetch all usernames
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/usernames");
        setUsernames(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch usernames.");
        setIsLoading(false);
      }
    };

    fetchUsernames();
  }, []);

  // Handle Delete Action
  const handleDelete = (usernameId) => {
    setUsernameToDelete(usernameId);
    setShowDeleteModal(true); // Show confirmation modal
  };

  const confirmDelete = async () => {
    if (!usernameToDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/usernames/${usernameToDelete}`);

      // Remove deleted username from the local state
      setUsernames((prevUsernames) => prevUsernames.filter(u => u._id !== usernameToDelete));

      alert("Username deleted successfully!");
    } catch (err) {
      setError("Failed to delete the username.");
    } finally {
      setShowDeleteModal(false);
      setUsernameToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUsernameToDelete(null);
  };

  // Handle Add Username
  const handleAdd = () => {
    setShowAddModal(true); // Open Add Modal
  };

  const confirmAdd = async () => {
    if (!newUsername.trim()) {
      alert("Username cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/usernames", { username: newUsername });

      // Add new username to the local state
      setUsernames((prevUsernames) => [...prevUsernames, response.data]);

      alert("Username added successfully!");
    } catch (err) {
      setError("Failed to add the username.");
    } finally {
      setShowAddModal(false);
      setNewUsername("");
    }
  };

  const cancelAdd = () => {
    setShowAddModal(false);
    setNewUsername("");
  };

  if (isLoading) {
    return (
      <div className="loading text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Usernames</h2>

      <div className="table-responsive">
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Username
          </button>
        </div>

        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>Usernames</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usernames.map((username) => (
              <tr key={username._id}>
                <td>{username.username}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(username._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
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
                  Are you sure you want to delete this username?
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

      {/* Add Username Modal */}
      {showAddModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Username</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelAdd}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelAdd}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={confirmAdd}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewUsernames;