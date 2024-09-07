import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { UserContext } from '../UserContext';
import './Exam.css'; // Import the CSS file

const Exam = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { user } = useContext(UserContext);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const subjectCode = location.state?.subjectCode || '';
  const questions = location.state?.questions || [];

  const handleSubmit = () => {
    // if (!user) {
    //   alert('You must be logged in to submit the exam.');
    //   return;
    // }

    let correctCount = 0;

    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctOptionIndex) {
        correctCount++;
      }
    });

    const score = correctCount;
    const total = questions.length;

    alert(`You scored ${score} out of ${total}`);

    navigate('/Studentpanel/dashboard');
  };

  return (
    <div className="exam-container">
      <h1 className="exam-title">Exam Questions</h1>
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <div key={index} className="question-card">
            <h3 className="question-text">{question.question}</h3>
            <div className="options-container">
              {question.options.map((option, i) => (
                <div key={i} className="option">
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={i}
                      checked={selectedAnswers[index] === i}
                      onChange={() =>
                        setSelectedAnswers({
                          ...selectedAnswers,
                          [index]: i,
                        })
                      }
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="no-questions">No questions available</p>
      )}
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Exam;
