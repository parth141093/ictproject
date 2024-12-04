import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditQuestion() {
  const { id } = useParams(); // Get the question ID from the URL params
  const [question, setQuestion] = useState("");
  const [radioOption, setRadioOption] = useState(""); // State for radio options
  const [image, setImage] = useState(null); // State for the image file
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/questions/${id}`);
        setQuestion(response.data.question);
        setRadioOption(response.data.radioOption || ""); // Set the radio option if available
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch question.");
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

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
      await axios.put(`http://localhost:3000/questions/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Question updated successfully");
      navigate("/"); // Redirect back to the AdminView page after submitting
    } catch (err) {
      setError("Failed to update the question.");
    }
  };

  if (isLoading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Question</h2>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditQuestion;
