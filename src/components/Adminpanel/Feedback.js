import React, { useState } from 'react';
import './Feedback.css'; // Import CSS file

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Handle feedback submission logic, send data to backend
  };

  return (
    <div className="feedback-container"> {/* Apply CSS class */}
      <h2>Feedback</h2>
      <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Any comments You would prefer to give US??"></textarea>
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default Feedback;
