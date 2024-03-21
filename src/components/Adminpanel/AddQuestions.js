import React, { useState } from 'react';
import './AddQuestions.css';

const AddQuestions = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);
  const [level, setLevel] = useState(''); // State for level selection
  const [course, setCourse] = useState(''); // State for course selection

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Validation logic
    // ...
  };

  return (
    <div className="add-questions-container">
      <h2>Add Question Bank</h2>
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
            answer.trim() !== '' && (
              <option key={index} value={index}>{answer}</option>
            )
          ))}
        </select>
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddQuestions;
