import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SimpleFeedbackForm.css';
import logo from '../../luovi-logo.png';
import RedIcon from '../Icons/RedIcon';
import YellowIcon from '../Icons/YellowIcon';
import GreenIcon from '../Icons/GreenIcon';

function SimpleFeedbackForm() {
  const { state } = useLocation();
  const { username } = state || {};
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (!username) {
      navigate("/", { replace: true });
    }
  }, [username, navigate]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/questions');
        const fetchedQuestions = response.data;
        setQuestions(fetchedQuestions.filter((question) => question.options.is_emoji === true));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch questions.');
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    console.log(feedback);
  }, [feedback]);

  const handleFeedbackChange = (questionId, value) => {
    setFeedback((prevFeedback) => {
      // Check if the answer for the questionId already exists
      const existingIndex = prevFeedback.findIndex(
        (answer) => answer.question_id === questionId
      );
  
      const newAnswer = {
        question_id: questionId,
        i_did_well: value === 3,
        sometimes_i_succeeded: value === 2,
        i_need_some_exercise: value === 1,
        is_emoji: true,
        feedback: null
      };
  
      if (existingIndex !== -1) {
        // Update the existing answer
        const updatedFeedback = [...prevFeedback];
        updatedFeedback[existingIndex] = newAnswer;
        return updatedFeedback;
      } else {
        // Add the new answer to the feedback array
        return [...prevFeedback, newAnswer];
      }
    });
  };

  const handleNextPage = () => {
    // Check if all questions have feedback
    const unansweredQuestions = questions.filter(
      (question) => !feedback.some((answer) => answer.question_id === question._id)
    );

    if (unansweredQuestions.length > 0) {
      setValidationError('Please answer all the questions before proceeding.');
    } else {
      setValidationError('');
      navigate('/feedback-2', { state: { username, feedback } });
    }
  };

  const readQuestion = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fi-FI'; // Set the language to Finnish
    utterance.rate = 0.3;
    speechSynthesis.speak(utterance);
  };

  if (isLoading) {
    return (
      <div className='loading text-center'>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className='error text-center'>
        <h1 className='text-danger'>404</h1>
        <p>Failed to fetch questions. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className='feedback-form container py-4'>
      <h2 className='text-primary mb-4'>
        Työelämään valmentautumisen yleiset tavoitteet
      </h2>
      <div className='luovi-logo'>
        <img src={logo} alt='Luovi Logo' className='luovi-logo-img' />
      </div>
      <div className='table-container table-responsive'>
        <table className='feedback-table table table-bordered text-center'>
          <thead className='table-light'>
            <tr>
              <th>Question</th>
              <th>Onnistuin hyvin</th>
              <th>Onnistuin toisinaan</th>
              <th>Tarvitsen harjoitusta</th>
              <th>Listen</th>
            </tr>
          </thead>
          <tbody>
            {questions
            .map((question) => (
              <tr key={question._id}>
                <td>{question.question}</td>
                <td>
                  {question.options.i_did_well && (
                    <div
                      className={`feedback-option ${
                        feedback.some(
                          (answer) =>
                            answer.question_id === question._id && answer.i_did_well
                        )
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() => handleFeedbackChange(question._id, 3)}
                    >
                      <GreenIcon />
                    </div>
                  )}
                </td>
                <td>
                  {question.options.sometimes_i_succeeded && (
                    <div
                      className={`feedback-option ${
                        feedback.some(
                          (answer) =>
                            answer.question_id === question._id && answer.sometimes_i_succeeded
                        )
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() => handleFeedbackChange(question._id, 2)}
                    >
                      <YellowIcon />
                    </div>
                  )}
                </td>
                <td>
                  {question.options.i_need_some_exercise && (
                    <div
                      className={`feedback-option ${
                        feedback.some(
                          (answer) =>
                            answer.question_id === question._id && answer.i_need_some_exercise
                        )
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() => handleFeedbackChange(question._id, 1)}
                    >
                      <RedIcon />
                    </div>
                  )}
                </td>
                <td>
                  <div className='listen-button-container'>
                    <button
                      className='btn btn-link p-0'
                      onClick={() => readQuestion(question.question)}
                      aria-label='Read question'
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 512 512'><path fill='#757f80' d='M205.504 438.735L54.186 285.036c-18.786-19.082-18.786-49.708 0-68.79l151.318-153.7c30.772-31.257 83.962-9.467 83.962 34.395V404.34c.001 43.862-53.189 65.652-83.962 34.395'/><path fill='#c4b6b6' d='M126.442 359.044H36.574c-15.84 0-28.8-12.96-28.8-28.8V171.038c0-15.84 12.96-28.8 28.8-28.8h89.869v216.806z'/><path fill='#000' d='M364.817 369.361c-4.336 0-8.579-2.15-11.075-6.082c-3.878-6.11-2.07-14.207 4.04-18.087c25.883-16.43 44.359-44.487 49.423-75.05c6.99-42.19-12.698-86.263-48.992-109.671c-6.082-3.923-7.832-12.032-3.909-18.114c3.921-6.083 12.03-7.835 18.115-3.91c44.944 28.987 69.314 83.633 60.641 135.978c-6.264 37.803-29.154 72.53-61.231 92.893a13.05 13.05 0 0 1-7.012 2.043m50.275 36.129c42.775-27.153 73.3-73.467 81.654-123.89c11.564-69.796-20.938-142.665-80.876-181.322c-6.085-3.925-14.194-2.173-18.115 3.91c-3.923 6.082-2.173 14.192 3.909 18.114c51.288 33.078 79.107 95.374 69.227 155.015c-7.155 43.183-33.266 82.828-69.846 106.048c-6.109 3.878-7.918 11.976-4.04 18.087a13.093 13.093 0 0 0 18.087 4.038m-79.742-89.852c17.855-11.337 30.093-29.896 33.576-50.92c4.758-28.721-8.601-58.696-33.243-74.588c-6.081-3.922-14.192-2.172-18.114 3.91s-2.173 14.192 3.91 18.115c15.989 10.312 24.667 29.714 21.592 48.279c-2.233 13.476-10.371 25.841-21.768 33.078c-6.11 3.879-7.918 11.978-4.04 18.087a13.1 13.1 0 0 0 11.075 6.082a13.06 13.06 0 0 0 7.012-2.043'/></svg>
                    </button>
                  </div>
                  Kuuntele
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {validationError && (
        <div className='validation-error text-danger text-center'>
          {validationError}
        </div>
      )}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary next-button mt-4"
          onClick={handleNextPage}
          aria-label="Next Question"
        >
          <span>Seuraava Sivu</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m16 8l-1.43 1.393L20.15 15H8v2h12.15l-5.58 5.573L16 24l8-8z" /><path fill="currentColor" d="M16 30a14 14 0 1 1 14-14a14.016 14.016 0 0 1-14 14m0-26a12 12 0 1 0 12 12A12.014 12.014 0 0 0 16 4" /></svg>
        </button>
      </div>
    </div>
  );
}

export default SimpleFeedbackForm;
