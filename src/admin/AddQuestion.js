import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddQuestion() {
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({
    i_did_well: false,
    sometimes_i_succeeded: false,
    i_need_some_exercise: false,
  });
  const [isFeedbackOnly, setIsFeedbackOnly] = useState(false); // New state
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  const handleFeedbackCheckboxChange = (e) => {
    setIsFeedbackOnly(e.target.checked); // Update isFeedbackOnly state
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = null;

    if (image) {
      const reader = new FileReader();
      base64Image = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(image);
      });
    }

    const payload = isFeedbackOnly
      ? {
        question,
        image: base64Image,
        options: {
          i_did_well: false,
          sometimes_i_succeeded: false,
          i_need_some_exercise: false,
          is_emoji: false,
        },
        choice_of_question: 1,
      }
      : {
        question,
        image: base64Image,
        options: {
          ...options,
          is_emoji: Object.values(options).some((value) => value === true),
        },
        choice_of_question: base64Image ? 2 : 1,
      };

    try {
      await axios.post(`http://localhost:3000/api/questions`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Question added successfully");
      navigate("/admin/questions");
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

        {/* Feedback-Only Checkbox */}
        <div className="mb-4">
          <div className="form-check">
            <input
              type="checkbox"
              id="isFeedbackOnly"
              name="isFeedbackOnly"
              checked={isFeedbackOnly}
              onChange={handleFeedbackCheckboxChange}
              className="form-check-input"
            />
            <label htmlFor="isFeedbackOnly" className="form-check-label fw-bold">
              Is Feedback Only
            </label>
          </div>
        </div>

        {!isFeedbackOnly && (
          <>
            {/* Checkbox Buttons */}
            <div className="mb-4">
              <label className="form-label fw-bold">Select an option to show:</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="i_did_well"
                  name="i_did_well"
                  checked={options.i_did_well}
                  onChange={handleCheckboxChange}
                  className="form-check-input"
                />
                <label htmlFor="i_did_well" className="form-check-label">
                  I did well
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="sometimes_i_succeeded"
                  name="sometimes_i_succeeded"
                  checked={options.sometimes_i_succeeded}
                  onChange={handleCheckboxChange}
                  className="form-check-input"
                />
                <label htmlFor="sometimes_i_succeeded" className="form-check-label">
                  Sometimes I succeeded
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="i_need_some_exercise"
                  name="i_need_some_exercise"
                  checked={options.i_need_some_exercise}
                  onChange={handleCheckboxChange}
                  className="form-check-input"
                />
                <label htmlFor="i_need_some_exercise" className="form-check-label">
                  I need some exercise
                </label>
              </div>
            </div>
          </>
        )}
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
