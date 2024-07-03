import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './AddQuestions.css';

const AddQuestions = () => {
  // Define state variables
  const [level, setLevel] = useState('Easy');
  const [course, setCourse] = useState('');
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']); // Array to hold answers
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);

  // Function to handle changes in answer inputs
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Implement your logic for form submission here
    console.log('Form submitted');
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/adminpanel" className="back-arrow">&#8592;</Link>
        <h2>Add Question Bank</h2>
      </nav>
      <br />
      <div className="add-questions-container">
        <div className="level-selection">
          <label>Select Level:</label>
          <div>
            <input type="radio" id="easy" name="level" value="Easy" checked={level === 'Easy'} onChange={() => setLevel('Easy')} />
            <label htmlFor="easy">Easy</label>
          </div>
          <div>
            <input type="radio" id="medium" name="level" value="Medium" checked={level === 'Medium'} onChange={() => setLevel('Medium')} />
            <label htmlFor="medium">Medium</label>
          </div>
          <div>
            <input type="radio" id="hard" name="level" value="Hard" checked={level === 'Hard'} onChange={() => setLevel('Hard')} />
            <label htmlFor="hard">Hard</label>
          </div>
        </div>
        <div className="course-selection">
          <label>Select Course:</label>
          <select value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="">Select Course</option>
            <option value="MERN Stack">MERN Stack</option>
            <option value="MEAN Stack">MEAN Stack</option>
            <option value="MAD">MAD</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <label>
          Question:
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        </label>
        <label>
          Options:
          {answers.map((answer, index) => (
            <input
              key={index}
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          ))}
        </label>
        <label>
          Correct Answer:
          <select value={correctAnswerIndex} onChange={(e) => setCorrectAnswerIndex(parseInt(e.target.value))}>
            <option value={-1}>Select Correct Answer</option>
            {answers.map((answer, index) => (
              <option key={index} value={index}>{answer}</option>
            ))}
          </select>
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddQuestions;
