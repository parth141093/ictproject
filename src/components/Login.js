import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../luovi-logo.png'; // Import the logo
import '../Login.css'; // Add this for custom styles

function Login() {
  const [username, setUsername] = useState('');
  const [isDetailedFeedback, setIsDetailedFeedback] = useState(null);
  const [error, setError] = useState(null); // State for showing error message
  const navigate = useNavigate();

  const setSessionWithExpiry = (key, value, expiryInMinutes) => {
    const now = new Date();
    const expiryTime = now.getTime() + expiryInMinutes * 60 * 1000; // Convert minutes to milliseconds
    const item = {
      value: value,
      expiry: expiryTime,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error message before making the request

    try {
      const response = await axios.get(`http://localhost:3000/api/usernames/${username}`);

      if (response.status === 200) {
        // Store the username in session storage for 10 minutes
        setSessionWithExpiry('username', username, 10);

        // Navigate based on the selected feedback form
        switch (isDetailedFeedback) {
          case true:
            navigate('/detail-feedback-form');
            break;
          case false:
            navigate('/simple-feedback-form');
            break;
          default:
            setError('Please select a feedback form.');
            break;
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Show error if the username was not found
        setError('Username not found. Please try again.');
      } else {
        // Handle other errors
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className='row justify-content-center w-100'>
        <div className='col-lg-6 col-md-8 col-sm-10'>
          <div className='card shadow-lg p-5'>
            <h2 className='card-title text-center mb-4'>Login</h2>
            {/* Luovi Logo */}
            <div className='text-center mb-4'>
              <img
                src={logo}
                alt='Luovi Logo'
                className='img-fluid'
                style={{ maxHeight: '120px' }}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='username' className='form-label'>
                  Username
                </label>
                <input
                  type='text'
                  id='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Enter your username'
                  required
                  className='form-control form-control-lg'
                />
              </div>
              <div className='mb-4'>
                <label className='form-label'>Select Feedback Form</label>
                <div>
                  <div className='form-check mb-3'>
                    <input
                      type='radio'
                      id='simple'
                      name='feedbackForm'
                      value='1'
                      onChange={() => setIsDetailedFeedback(false)}
                      className='form-check-input large-checkbox'
                    />
                    <label htmlFor='simple' className='form-check-label'>
                      Simple Feedback Form
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      type='radio'
                      id='detailed'
                      name='feedbackForm'
                      value='2'
                      onChange={() => setIsDetailedFeedback(true)}
                      className='form-check-input large-checkbox'
                    />
                    <label htmlFor='detailed' className='form-check-label'>
                      Detailed Feedback Form
                    </label>
                  </div>
                </div>
              </div>
              <button type='submit' className='btn btn-primary btn-lg w-100'>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
