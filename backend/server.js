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

// Define test schema
const testSchema = new mongoose.Schema({
  subjectCode: {
    type: String,
    required: true,
    enum: ['IT345', 'IT346', 'IT347', 'IT348'] // Assuming these are your subject codes
  },
  date: {
    type: Date,
    required: true
  },
  EasyCount: {
    type: Number,
    required: true,
    min: 0,
    max: 20
  },
  MediumCount: {
    type: Number,
    required: true,
    min: 0,
    max: 20
  },
  HardCount: {
    type: Number,
    required: true,
    min: 0,
    max: 20
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Upcoming'],
    required: true
  }
});

const Test = mongoose.model('Test', testSchema);

// Define profile schema
const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  collegeId: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const Profile = mongoose.model('Profile', profileSchema);

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

// Add Test Route
app.post('/addtest', async (req, res) => {
  const { subjectCode, date, easyCount, mediumCount, hardCount } = req.body;
  console.log("Received request to add test:", req.body);
  try {
    // Create a new Test document
    const newTest = new Test({
      subjectCode: subjectCode,
      date: date,
      EasyCount: easyCount,
      MediumCount: mediumCount,
      HardCount: hardCount
    });

    // Check if the selected date is today or in the future
    const today = new Date();
    const selectedDate = new Date(date);
    if (selectedDate.toDateString() === today.toDateString()) {
      // If the selected date is today, set the test status to "Ongoing"
      newTest.status = "Ongoing";
    } else {
      // If the selected date is in the future, set the test status to "Upcoming"
      newTest.status = "Upcoming";
    }

    // Save the new test to the database
    await newTest.save();
    res.json({ success: true, message: 'Test added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to add test' });
  }
});

// Fetch upcoming exams route
app.get('/tests/Upcoming', async (req, res) => {
  try {
    const upcomingExams = await Test.find({ status: 'Upcoming' }).select(' subjectCode date');
    res.json(upcomingExams);
  } catch (error) {
    console.error('Error fetching upcoming exams:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch upcoming exams' });
  }
});

// Fetch ongoing exams route
app.get('/tests/Ongoing', async (req, res) => {
  try {
    const ongoingExams = await Test.find({ status: 'Ongoing' }).select(' subjectCode date');
    res.json(ongoingExams);
  } catch (error) {
    console.error('Error fetching ongoing exams:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch ongoing exams' });
  }
});

// Fetch questions route
app.get('/questions/:subjectCode', async (req, res) => {
  const { subjectCode } = req.params;
  const { easyCount, mediumCount, hardCount } = req.query; // Extract counts from query parameters

  try {
    // Fetch questions based on subject code and counts for each difficulty level
    const easyQuestions = await Question.find({ subjectCode, questionType: 'easy' }).limit(parseInt(easyCount));
    const mediumQuestions = await Question.find({ subjectCode, questionType: 'medium' }).limit(parseInt(mediumCount));
    const hardQuestions = await Question.find({ subjectCode, questionType: 'hard' }).limit(parseInt(hardCount));

    // Combine questions from all difficulty levels
    const questions = {
      easy: easyQuestions,
      medium: mediumQuestions,
      hard: hardQuestions
    };

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch questions' });
  }
});

// // Fetch Questions Route
// app.get('/questions/:subjectCode/:date', async (req, res) => {
//   const { subjectCode, date } = req.params;
//   try {
//     // Fetch questions based on subject code and date
//     const questions = await Question.find({ subjectCode, date });
//     res.json(questions);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to fetch questions' });
//   }
// });

// // Fetch Tests Route
// app.get('/tests/:subjectCode/:date', async (req, res) => {
//   const { subjectCode, date } = req.params;
//   try {
//     // Fetch tests based on subject code and date
//     const tests = await Test.find({ subjectCode, date });
//     res.json(tests);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to fetch tests' });
//   }
// });

// Get Profile Route
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.json({ success: true, profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update Profile Route
app.put('/api/profile', async (req, res) => {
  try {
    const { name, dob, designation, collegeId, phoneNumber, email } = req.body;
    const profile = await Profile.findOneAndUpdate(
      {},
      { name, dob, designation, collegeId, phoneNumber, email },
      { new: true, upsert: true }
    );
    res.json({ success: true, profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));