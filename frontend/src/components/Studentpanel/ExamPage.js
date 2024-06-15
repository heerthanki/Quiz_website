import React from 'react';

const ExamPage = (props) => {
  const { questions, subjectCode } = props.location.state;

  return (
    <div>
      <h1>Exam Page</h1>
      <h2>Subject Code: {subjectCode}</h2>
      <h2>Questions:</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            {/* Display your question details here */}
            <p>{question.text}</p>
            {/* Add more question details as needed */}
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default ExamPage;
