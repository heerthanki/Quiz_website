import React, { useState } from 'react';
import './Add_test.css'; // Import CSS file
import { Link } from 'react-router-dom';
const Add_test = () => {
  const [easyCount, setEasyCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);

  const handleSubmit = () => {
    // Handle submission logic, send data to backend
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/adminpanel" className="back-arrow">&#8592;</Link>
        <h2>Add Test</h2>
      </nav>
    <div className="add-test-container"> {/* Apply CSS class */}
      <h2>Select Questions</h2>
      <label>
        Easy Questions:
        <input type="number" value={easyCount} min="0" onChange={(e) => setEasyCount(e.target.value)} />
      </label>
      <label>
        Medium Questions:
        <input type="number" value={mediumCount}  min="0" onChange={(e) => setMediumCount(e.target.value)} />
      </label>
      <label>
        Hard Questions:
        <input type="number" value={hardCount} min="0" onChange={(e) => setHardCount(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
    </div>
  );
};

export default Add_test;
