import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Submission.css'; // Import CSS file

const Submissions = () => {
  const [submissionData, setSubmissionData] = useState([]);

  useEffect(() => {
    // Fetch submissions data from backend
    // Update state with fetched data

    // For testing purposes, you can set some static data
    const staticData = [
      { id: 1, studentName: 'Heer Thanki', marks: 85, remarks: 'Well done!' },
      { id: 2, studentName: 'Riya Thakkar', marks: 92, remarks: 'Excellent work!' },
      { id: 3, studentName: 'Tanvi Vavadiya', marks: 78, remarks: 'Good effort.' },
      // Add more static data as needed
    ];

    // Set the static data to state
    setSubmissionData(staticData);
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
