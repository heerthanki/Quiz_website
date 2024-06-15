import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [ongoingExams, setOngoingExams] = useState([]);

  useEffect(() => {
    // Fetch upcoming exams from the backend
    const fetchUpcomingExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tests/Upcoming');
        setUpcomingExams(response.data);
      } catch (error) {
        console.error('Error fetching upcoming exams:', error);
      }
    };

    // Fetch ongoing exams from the backend
    const fetchOngoingExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tests/Ongoing');
        setOngoingExams(response.data);
      } catch (error) {
        console.error('Error fetching ongoing exams:', error);
      }
    };

    fetchUpcomingExams();
    fetchOngoingExams();
  }, []);

  const isExamDatePassed = (examDate) => {
    const currentDate = new Date();
    const examDateTime = new Date(examDate);
    return currentDate > examDateTime;
  };

  const handleStartExam = async (subjectCode, questionType) => {
    try {
      // Fetch a question from the backend based on subject code and question type
      const response = await axios.get(`http://localhost:5000/questions/${subjectCode}/${questionType}`);
      const question = response.data;
      console.log('Fetched question:', question);
  
      // Do something with the fetched question, such as displaying it in a modal or navigating to a new page
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };
  
  return (
    <div className="dashboard-container">
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/Studentpanel/profile">
              <FaUser className="icon-student" />
            </Link>
          </li>
        </ul>
        <div className="logo">
          <Link to="/">Exam Portal</Link>
        </div>
      </nav>
      <div className="content">
        <div className="upcoming-exams">
          <h2>Upcoming Exams</h2>
          {upcomingExams.map((exam) => (
            <div className="exam-card" key={exam._id}>
              <h3>Subject Code: {exam.subjectCode}</h3>
              <p>Date: {exam.date}</p>
              <button disabled={!isExamDatePassed(exam.date)}>Start</button>
            </div>
          ))}
        </div>
        <div className="ongoing-exams">
          <h2>Ongoing Exams</h2>
          {ongoingExams.map((exam) => (
            <div className="exam-card" key={exam._id}>
              <h3>Subject Code: {exam.subjectCode}</h3>
              <p>Date: {exam.date}</p>
              <button onClick={() => handleStartExam(exam.subjectCode, exam.easyCount, exam.mediumCount, exam.hardCount)}>Start</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
