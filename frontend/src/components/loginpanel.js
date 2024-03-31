import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginpanel.css'; // Import the CSS file

const LoginPanel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.startsWith('t')) {
      navigate('/adminpanel');
    } else if (username.startsWith('s')) {
      navigate('/studentpanel');
    } else {
      setErrorMessage('Invalid username');
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
