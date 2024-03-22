import React, { useState } from 'react';
import './Feedback.css'; // Import CSS file
<<<<<<< HEAD
import { Link } from 'react-router-dom'; 
=======
import { Link } from 'react-router-dom'; // Import Link for navigation

>>>>>>> 358176bc48e16a98ae17cbb9fc89ba03d9f1c91b
const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Handle feedback submission logic, send data to backend
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/adminpanel" className="back-arrow">&#8592;</Link>
        <h2>Feedback</h2>
      </nav>
<<<<<<< HEAD
    <div className="feedback-container"> {/* Apply CSS class */}
      <h2>Feedback</h2>
      <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Any comments You would prefer to give US??"></textarea>
      <button onClick={handleSubmit}>Submit Feedback</button>
=======
      <div className="feedback-container"> {/* Apply CSS class */}
        <h2>Feedback</h2>
        <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Any comments You would prefer to give US??"></textarea>
        <button onClick={handleSubmit}>Submit Feedback</button>
      </div>
>>>>>>> 358176bc48e16a98ae17cbb9fc89ba03d9f1c91b
    </div>
    </div>
  );
};

export default Feedback;
