import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Submission.css'; // Import CSS file

const Submissions = () => {
  const [submissionData, setSubmissionData] = useState([]);

  useEffect(() => {
    // Fetch submissions data from backend
    // Update state with fetched data
  }, []);

  return (
    <div>
      <nav className="navbar">
        <Link to="/adminpanel" className="back-arrow">&#8592;</Link>
        <h2>Show Submissions</h2>
      </nav>
      <div className="submissions-container">
        <h2>Show Submissions</h2>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Marks</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {submissionData.map((submission) => (
              <tr key={submission.id}>
                <td>{submission.studentName}</td>
                <td>{submission.marks}</td>
                <td>{submission.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submissions;
