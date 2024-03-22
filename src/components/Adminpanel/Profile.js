import React, { useState, useEffect } from 'react';
import './Profile.css'; // Import CSS file

const Profile = () => {
  const initialProfileData = {
    name: 'Kartik Ajwal',
    dob: '1990-01-01',
    designation: 'Teacher',
    collegeId: '123456',
    phoneNumber: '123-456-7890',
    email: 'kartik@example.com'
  };

  const [profileData, setProfileData] = useState(initialProfileData);
  const [editMode, setEditMode] = useState(false);
  const [editableProfileData, setEditableProfileData] = useState({
    phoneNumber: '',
    email: ''
  });

  useEffect(() => {
    setEditableProfileData({
      phoneNumber: profileData.phoneNumber,
      email: profileData.email
    });
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfileData({ ...editableProfileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileData({
      ...profileData,
      phoneNumber: editableProfileData.phoneNumber,
      email: editableProfileData.email
    });
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditableProfileData({
      phoneNumber: profileData.phoneNumber,
      email: profileData.email
    });
    setEditMode(false);
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
            <input
              type="text"
              name="name"
              value={profileData.name}
              disabled // Disable the input field
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="text"
              value={profileData.dob}
              disabled // Disable the input field
            />
          </label>
          <label>
            Designation:
            <input
              type="text"
              value={profileData.designation}
              disabled // Disable the input field
            />
          </label>
          <label className="college-id">
  College ID:
  <input
    type="text"
    value={profileData.collegeId}
    disabled // Disable the input field
  />
</label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={editableProfileData.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <label className="email">
  Email:
  <input
    type="email"
    name="email"
    value={editableProfileData.email}
    onChange={handleChange}
  />
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
          <p>Email: {profileData.email}</p>
        </div>
      )}
      {!editMode && <button onClick={() => setEditMode(true)}>Edit</button>}
      {editMode && (
        <button type="button" onClick={handleCancel}>Cancel</button>
      )}
    </div>
  );
};

export default Profile;
