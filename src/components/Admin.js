import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import { FaUser } from 'react-icons/fa'; // Assuming you're using Font Awesome for icons

const AdminPanel = () => {
  return (
    <div className="Admin">
      <div className="Nav-bar">
        <div className="profile">
          <Link to="/Adminpanel/profile">
            <FaUser className="icon" />
          </Link>
        </div>
        <div className="title">Admin Panel</div>
      </div>
      <br />
      <div className="admin-card-container">
        <div className="admin-card" role="button" tabIndex={0}>
          <Link to="/Adminpanel/addquestions">Add Questions</Link>
        </div>
        <div className="admin-card" role="button" tabIndex={0}>
          <Link to="/Adminpanel/addtest">Add Test</Link>
        </div>
        <div className="admin-card" role="button" tabIndex={0}>
          <Link to="/Adminpanel/feedback">Feedback Form</Link>
        </div>
        <div className="admin-card" role="button" tabIndex={0}>
          <Link to="/Adminpanel/submissions">Submissions</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
