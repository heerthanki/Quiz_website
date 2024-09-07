<<<<<<< HEAD
=======
// server.js

>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
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
<<<<<<< HEAD
    enum: ['IT345', 'IT346', 'IT347', 'IT348']
=======
    enum: ['IT345', 'IT346', 'IT347', 'IT348'] // Assuming these are your subject codes
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
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

<<<<<<< HEAD
// Define exam result schema
const examResultSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  subjectCode: {
    type: String,
    required: true,
    enum: ['IT345', 'IT346', 'IT347', 'IT348']
  },
  date: {
    type: Date,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  answers: {
    type: Map,
    of: Number,
    required: true
  }
});

const ExamResult = mongoose.model('ExamResult', examResultSchema);

// Add route to submit exam results
app.post('/api/submit-exam', async (req, res) => {
  const { username, subjectCode, date, score, total, answers } = req.body;

  try {
    const newExamResult = new ExamResult({
      username,
      subjectCode,
      date,
      score,
      total,
      answers
    });

    await newExamResult.save();
    res.json({ success: true, message: 'Exam result submitted successfully' });
  } catch (error) {
    console.error('Error submitting exam result:', error);
    res.status(500).json({ success: false, message: 'Failed to submit exam result' });
  }
});



// Predefined subjects
const predefinedSubjects = ['MAD', 'DevOps', 'CN', 'CRNS'];

// Login Route (Updated)
=======
// Predefined subjects
const predefinedSubjects = ['MAD', 'DevOps', 'CN', 'CRNS'];

// Login Route
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

<<<<<<< HEAD
=======
    // Check if passwords match
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
    if (password !== user.password) {
      return res.json({ success: false, message: 'Invalid password' });
    }

<<<<<<< HEAD
    if (user.userType === 'student') {
      res.json({ success: true, message: 'Login successful', userType: 'student', username: user.username });
    } else if (user.userType === 'teacher') {
      res.json({ success: true, message: 'Login successful', userType: 'teacher', username: user.username });
=======
    // Navigate based on user type
    if (user.userType === 'student') {
      res.json({ success: true, message: 'Login successful', userType: 'student' });
    } else if (user.userType === 'teacher') {
      res.json({ success: true, message: 'Login successful', userType: 'teacher' });
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
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
<<<<<<< HEAD
=======
    // Check if subject is predefined
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
    if (!predefinedSubjects.includes(subject)) {
      return res.status(400).json({ success: false, message: 'Invalid subject' });
    }

    const newQuestion = new Question({
<<<<<<< HEAD
      question,
      options,
      correctOptionIndex,
      questionType,
      subject,
      subjectCode
=======
      question: question,
      options: options,
      correctOptionIndex: correctOptionIndex,
      questionType: questionType,
      subject: subject,
      subjectCode: subjectCode
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
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
<<<<<<< HEAD
    const newTest = new Test({
      subjectCode,
      date,
=======
    // Create a new Test document
    const newTest = new Test({
      subjectCode: subjectCode,
      date: date,
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
      EasyCount: easyCount,
      MediumCount: mediumCount,
      HardCount: hardCount
    });

<<<<<<< HEAD
    const today = new Date();
    const selectedDate = new Date(date);
    if (selectedDate.toDateString() === today.toDateString()) {
      newTest.status = "Ongoing";
    } else {
      newTest.status = "Upcoming";
    }

=======
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
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
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
<<<<<<< HEAD
    const upcomingExams = await Test.find({ status: 'Upcoming' }).select('subjectCode date');
=======
    const upcomingExams = await Test.find({ status: 'Upcoming' }).select(' subjectCode date');
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
    res.json(upcomingExams);
  } catch (error) {
    console.error('Error fetching upcoming exams:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch upcoming exams' });
  }
});

// Fetch ongoing exams route
app.get('/tests/Ongoing', async (req, res) => {
  try {
<<<<<<< HEAD
    const ongoingExams = await Test.find({ status: 'Ongoing' }).select('subjectCode date');
=======
    const ongoingExams = await Test.find({ status: 'Ongoing' }).select(' subjectCode date');
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
    res.json(ongoingExams);
  } catch (error) {
    console.error('Error fetching ongoing exams:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch ongoing exams' });
  }
});

<<<<<<< HEAD
// Fetch test details by subject code
app.get('/tests/:subjectCode', async (req, res) => {
  const { subjectCode } = req.params;

  try {
    const test = await Test.findOne({ subjectCode });
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    res.json(test);
  } catch (error) {
    console.error('Error fetching test:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch test' });
  }
});

// Fetch questions based on counts from the test
app.get('/questions/:subjectCode', async (req, res) => {
  const { subjectCode } = req.params;

  try {
    const test = await Test.findOne({ subjectCode });
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    const { EasyCount, MediumCount, HardCount } = test;

    const easyQuestions = await Question.find({ subjectCode, questionType: 'easy' }).limit(EasyCount);
    const mediumQuestions = await Question.find({ subjectCode, questionType: 'medium' }).limit(MediumCount);
    const hardQuestions = await Question.find({ subjectCode, questionType: 'hard' }).limit(HardCount);

=======
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
>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
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

<<<<<<< HEAD
=======
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

>>>>>>> cc9b4b2423f6263b2d2614b1627a32e8ad1fdd2f
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