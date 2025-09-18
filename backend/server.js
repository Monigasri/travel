// server.js
require('dotenv').config(); // Load environment variables FIRST

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://127.0.0.1:27017/ai-travel-planner')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Models
const Feedback = mongoose.model('Feedback', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}));

const authRoutes = require('./routes/auth');
const groqRoutes = require('./routes/groq');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,   // ✅ using .env value
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Load Passport strategies after session
require('./config/passport'); 

// Routes
app.use('/auth', authRoutes);
app.use('/api/groq', groqRoutes);

// Feedback route
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (err) {
    console.error('Feedback submission error:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
