const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { surname, givenName, dob, username, email, password } = req.body;

    // Validate required fields
    if (!surname || !givenName || !dob || !username || !email || !password) {
      return res.status(400).json({ err: 'All fields are required.' });
    }

    // Check if email or username is already taken
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ err: 'Username or email already taken.' });
    }

    // Create and save the user
    const newUser = new User({ surname, givenName, dob, username, email, password });
    await newUser.save();

    // Create JWT payload
    const payload = {
      id: newUser._id,
      surname: newUser.surname,
      givenName: newUser.givenName,
      dob: newUser.dob,
      username: newUser.username,
      email: newUser.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: payload });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Login route (using email)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ err: 'Invalid credentials.' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ err: 'Invalid credentials.' });
    }

    // Prepare payload
    const payload = {
      id: user._id,
      surname: user.surname,
      givenName: user.givenName,
      dob: user.dob,
      username: user.username,
      email: user.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: payload });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Verify route
router.get('/verify', authMiddleware, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
