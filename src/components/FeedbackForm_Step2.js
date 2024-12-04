import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const FeedbackForm_Step2 = () => {
  const { state } = useLocation();
  const { username, feedback } = state;
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]); 

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/questions');
        const fetchedQuestions = response.data;
        setQuestions(fetchedQuestions);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch questions.');
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleInputChange = (questionId, value) => {
    setAnswers((prevAnswers) => {
      // Check if the question already has an entry
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.question_id === questionId
      );
  
      const newAnswer = {
        question_id: questionId,
        i_did_well: false,
        sometimes_i_succeeded: false,
        i_need_some_exercise: false,
        is_emoji: false,
        feedback: value,
      };
  
      if (existingAnswerIndex > -1) {
        // Update the existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          ...updatedAnswers[existingAnswerIndex],
          feedback: value, // Only update the feedback field
        };
        return updatedAnswers;
      } else {
        // Add a new answer
        return [...prevAnswers, newAnswer];
      }
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine feedback and answers
    const combinedData = [...feedback, ...answers];

    const payload = {
      username,
      answers: combinedData,
    };

    try {
      console.log('payload');
      console.log(payload);
      const response = await axios.post('http://localhost:3000/api/submit', payload);
      console.log('Submission successful:', response.data);
      // Optionally redirect or show a success message
    } catch (err) {
      console.error('Submission failed:', err);
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
    <div className='container mt-4'>
      <div className='card'>
        <div className='card-body'>
          <h3 className='card-title text-center mb-4'>Ammatillinen palaute</h3>
          <form onSubmit={handleSubmit}>
            <table className='table table-borderless'>
              <tbody>
                {questions
                  .filter((question) => question.options.is_emoji === false) // Filter only non-emoji questions
                  .map((question) => (
                    <tr key={question._id}>
                      <td className="align-middle" style={{ width: '10%' }}>
                        <img
                          src={question.icon || 'https://via.placeholder.com/40'}
                          alt={question.question}
                          className="me-2"
                        />
                      </td>
                      <td className="align-middle" style={{ width: '30%' }}>
                        <label className="form-label">{question.question}</label>
                      </td>
                      <td style={{ width: '40%' }}>
                        <textarea
                          className="form-control"
                          placeholder="Kirjoita vastauksesi"
                          value={answers.find((answer) => answer.question_id === question._id)?.feedback || ''} // Controlled value
                          onChange={(e) =>
                            handleInputChange(question._id, e.target.value)
                          } // Handle change
                        />
                      </td>
                      <td className="align-middle" style={{ width: '20%' }}>
                        <button
                          className="btn btn-link"
                          onClick={(e) => {
                            e.preventDefault();
                            readQuestion(question.question);
                          }}
                        >
                          Kuuntele
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className='d-flex justify-content-between'>
              <button type='button' className='btn btn-secondary'>
                Edellinen sivu
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Valmis
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm_Step2;
