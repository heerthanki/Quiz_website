import React, { useState } from 'react';
import './Add_test.css'; // Import CSS file

const Add_test = () => {
  const [easyCount, setEasyCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);

  const handleSubmit = () => {
    // Handle submission logic, send data to backend
  };

  return (
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
  );
};

export default Add_test;
