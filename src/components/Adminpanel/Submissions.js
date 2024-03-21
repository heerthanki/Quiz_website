import React, { useEffect, useState } from 'react';

const Submissions = () => {
  const [submissionData, setSubmissionData] = useState([]);

  useEffect(() => {
    // Fetch submissions data from backend
    // Update state with fetched data
  }, []);

  return (
    <div>
      <h2>Show Submissions</h2>
      <table>
        <thead>
          <tr>
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
  );
};

export default Submissions;
