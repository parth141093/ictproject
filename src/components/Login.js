// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../luovi-logo.png'; // Import the logo
import '../Login.css'; // Add this for custom styles

function Login() {
  const [username, setUsername] = useState('');
  const [isDetailedFeedback, setIsDetailedFeedback] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (isDetailedFeedback) {
      case true:
        navigate('/detail-feedback-form', { state: { username } });
        break;
      case false:
        navigate('/simple-feedback-form', { state: { username } });
        break;
      default:
        alert('Please select a feedback form.');
        break;
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
