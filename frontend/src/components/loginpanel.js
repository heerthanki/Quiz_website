import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginpanel.css';

const LoginPanel = ({ setAuthToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      if (response.data.success) {

        // Assuming your backend returns a user type field
        const userType = response.data.userType;

        // Navigate based on user type
        if (userType === 'teacher') {
          navigate('/adminpanel');
        } else if (userType === 'student') {
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
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default LoginPanel;
