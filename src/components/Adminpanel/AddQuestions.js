import React, { useState } from 'react';
import './AddQuestions.css'; 

const AddQuestions = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']); 
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1); 

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  }; //set options

  const handleSubmit = () => {
    if (question.trim() === '') {
      window.alert('Question is missing');
      return;
    }
    if (answers.some(answer => answer.trim() === '')) {
      window.alert('Options are missing');
      return;
    }

    const uniqueOptions = [...new Set(answers)];
    if (uniqueOptions.length !== answers.length) {
      window.alert('Options must be unique');
      return;
    }

    if (correctAnswerIndex === -1) {
      window.alert('Please select the correct answer');
      return;
    }

    const data = {
      question: question,
      answers: answers,
      correctAnswerIndex: correctAnswerIndex
    };
    console.log(data); 
    setQuestion('');
    setAnswers(['', '', '', '']);
    setCorrectAnswerIndex(-1);
  };
  
  return (
    <div className="add-questions-container">
      <h2>Add Question Bank</h2>
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
