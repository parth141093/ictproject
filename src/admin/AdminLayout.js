import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import ViewQuestions from "./ViewQuestions";
import EditQuestion from "./EditQuestion";
import AddQuestion from "./AddQuestion";
import ViewSubmittedDetails from "./ViewSubmittedDetails";
import ViewUsernames from "./ViewUsernames";
import logo from "../luovi-logo.png"; // Import the logo

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "Lu0w1") {
      setIsAuthenticated(true);
    } else {
      setError("Invalid username or password.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row justify-content-center w-100">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="card shadow-lg p-5">
              <h2 className="card-title text-center mb-4">Admin Login</h2>
              {/* Luovi Logo */}
              <div className="text-center mb-4">
                <img
                  src={logo}
                  alt="Luovi Logo"
                  className="img-fluid"
                  style={{ maxHeight: "120px" }}
                />
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    className="form-control form-control-lg"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="form-control form-control-lg"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="d-flex flex-nowrap">
      <Sidebar />
      <div className="flex-fill p-3">
        <Routes>
          <Route path="/" element={<ViewQuestions />} />
          <Route path="/questions" element={<ViewQuestions />} />
          <Route path="/questions/add" element={<AddQuestion />} />
          <Route path="/questions/edit/:id" element={<EditQuestion />} />
          <Route path="/submitted-details" element={<ViewSubmittedDetails />} />
          <Route path="/usernames" element={<ViewUsernames />} />
        </Routes>
      </div>
    </main>
  );
};

export default AdminLayout;
