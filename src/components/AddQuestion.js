import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddQuestion() {
  const [question, setQuestion] = useState("");
  const [radioOption, setRadioOption] = useState(""); // State for radio options
  const [image, setImage] = useState(null); // State for the image file
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleRadioChange = (e) => {
    setRadioOption(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("question", question);
    formData.append("radioOption", radioOption);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:3000/questions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Question added successfully");
      navigate("/"); // Redirect back to the AdminView page after submission
    } catch (err) {
      setError("Failed to add the question.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Question</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        {/* Question Text */}
        <div className="mb-4">
          <label htmlFor="question" className="form-label fw-bold">
            Question
          </label>
          <textarea
            id="question"
            className="form-control"
            rows="3"
            value={question}
            onChange={handleInputChange}
            placeholder="Enter the question text"
            required
          ></textarea>
        </div>

        {/* Radio Buttons */}
        <div className="mb-4">
          <label className="form-label fw-bold">Select an Option</label>
          <div className="form-check">
            <input
              type="radio"
              id="option1"
              name="radioOption"
              value="Option 1"
              checked={radioOption === "Option 1"}
              onChange={handleRadioChange}
              className="form-check-input"
            />
            <label htmlFor="option1" className="form-check-label">
              Option 1
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="option2"
              name="radioOption"
              value="Option 2"
              checked={radioOption === "Option 2"}
              onChange={handleRadioChange}
              className="form-check-input"
            />
            <label htmlFor="option2" className="form-check-label">
              Option 2
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="option3"
              name="radioOption"
              value="Option 3"
              checked={radioOption === "Option 3"}
              onChange={handleRadioChange}
              className="form-check-input"
            />
            <label htmlFor="option3" className="form-check-label">
              Option 3
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="form-label fw-bold">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Add Question
        </button>
      </form>
    </div>
  );
}

export default AddQuestion;
