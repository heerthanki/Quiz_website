import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddQuestions from './components/Adminpanel/AddQuestions'; 
import FeedbackForm from './components/Adminpanel/Feedback'; 
import Profile from './components/Adminpanel/Profile';
import Submissions from './components/Adminpanel/Submissions';
import AddTest from './components/Adminpanel/Add_test';
import LoginPanel from './components/loginpanel';
import Admin from './components/Admin';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPanel />} />
          <Route path="/Adminpanel" element={<Admin />} />
          <Route path="/Adminpanel/addquestions" element={<AddQuestions />} /> 
                <Route path="/Adminpanel/feedback" element={<FeedbackForm />} /> 
                <Route path="/Adminpanel/profile" element={<Profile />} />
                <Route path="/Adminpanel/submissions" element={<Submissions />} />
                <Route path="/Adminpanel/addtest" element={<AddTest />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
