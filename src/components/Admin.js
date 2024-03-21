import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';


const AdminPanel = () => {
  return (
    <div className="Admin">
      <div className="Nav-bar">
        <h2><center>Admin Panel</center></h2>
        <Link to="/Adminpanel/profile">
          Profile
        </Link>
      </div>
      <div className="admin-card-container">
        <div className="admin-card" role="button" tabIndex={0}>
          <Link to="/Adminpanel/addquestions">Add Questions</Link>
        </div>
        <div className="admin-card" role="button" tabIndex={0}>
          <Link to="/Adminpanel/feedback">Feedback Form</Link>
        </div>
        <div className="admin-card" role="button" tabIndex={0}>
          <Link to="/Adminpanel/submissions">Submissions</Link>
        </div>
        <div className="admin-card" role="button" tabIndex={0}>
          <Link to="/Adminpanel/addtest">Add Test</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
