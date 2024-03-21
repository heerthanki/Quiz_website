import React, { useState, useEffect } from 'react';
import './Profile.css'; // Import CSS file

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    dob: '',
    designation: '',
    collegeId: '',
    phoneNumber: ''
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch teacher profile data from backend
    // Update state with fetched data
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic, send data to backend
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="profile-container">
      <h2>Teacher Profile</h2>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={profileData.name} onChange={handleChange} />
          </label>
          <label>
            Date of Birth:
            <input type="date" name="dob" value={profileData.dob} onChange={handleChange} />
          </label>
          <label>
            Designation:
            <input type="text" name="designation" value={profileData.designation} onChange={handleChange} />
          </label>
          <label>
            College ID:
            <input type="text" name="collegeId" value={profileData.collegeId} onChange={handleChange} />
          </label>
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" value={profileData.phoneNumber} onChange={handleChange} />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <p>Name: {profileData.name}</p>
          <p>Date of Birth: {profileData.dob}</p>
          <p>Age: {profileData.dob && calculateAge(profileData.dob)}</p>
          <p>Designation: {profileData.designation}</p>
          <p>College ID: {profileData.collegeId}</p>
          <p>Phone Number: {profileData.phoneNumber}</p>
        </div>
      )}
      <button onClick={() => setEditMode(!editMode)}>{editMode ? 'Cancel' : 'Edit'}</button>
    </div>
  );
};

export default Profile;
