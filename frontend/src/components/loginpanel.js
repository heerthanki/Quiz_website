<<<<<<< HEAD
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import './loginpanel.css';

const LoginPanel = () => {
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginpanel.css';

const LoginPanel = ({ setAuthToken }) => {
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
<<<<<<< HEAD
  const { setUser } = useContext(UserContext); // Use context to set user info globally
=======
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      if (response.data.success) {
<<<<<<< HEAD
        // Update UserContext
      setUser({
        username: response.data.username,
        userType: response.data.userType
      });
        // Navigate based on user type
        if (response.data.userType === 'teacher') {
          navigate('/adminpanel');
        } else if (response.data.userType === 'student') {
=======
        const userType = response.data.userType;
        if (userType === 'teacher') {
          navigate('/adminpanel');
        } else if (userType === 'student') {
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
          navigate('/studentpanel/dashboard');
        } else {
          setErrorMessage('Invalid user type');
        }
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error logging in');
    }
  };

  return (
    <div className="login-panel">
      <h2>Login Panel</h2>
      <div>
        <label>Username:</label>
<<<<<<< HEAD
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
=======
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default LoginPanel;
