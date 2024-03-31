// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/QuizApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Define user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  userType: String
});

const User = mongoose.model('User', userSchema);

// Define question schema
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctOptionIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
  questionType: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['MAD', 'DevOps', 'CN', 'CRNS']
  },
  subjectCode: {
    type: String,
    required: true,
    enum: ['IT345', 'IT346', 'IT347', 'IT348']
  }
});

const Question = mongoose.model('Question', questionSchema);

// Predefined subjects
const predefinedSubjects = ['MAD', 'DevOps', 'CN', 'CRNS'];

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Check if passwords match
    if (password !== user.password) {
      return res.json({ success: false, message: 'Invalid password' });
    }

    // Navigate based on user type
    if (user.userType === 'student') {
      res.json({ success: true, message: 'Login successful', userType: 'student' });
    } else if (user.userType === 'teacher') {
      res.json({ success: true, message: 'Login successful', userType: 'teacher' });
    } else {
      res.json({ success: false, message: 'Invalid user type' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Add Question Route
app.post('/addquestion', async (req, res) => {
  const { question, options, correctOptionIndex, questionType, subject, subjectCode } = req.body;
  console.log("Received request to add question:", req.body);
  try {
    // Check if subject is predefined
    if (!predefinedSubjects.includes(subject)) {
      return res.status(400).json({ success: false, message: 'Invalid subject' });
    }

    const newQuestion = new Question({
      question: question,
      options: options,
      correctOptionIndex: correctOptionIndex,
      questionType: questionType,
      subject: subject,
      subjectCode: subjectCode
    });

    await newQuestion.save();
    res.json({ success: true, message: 'Question added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to add question' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));