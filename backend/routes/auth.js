const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const router = express.Router();

// Start Google OAuth flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err || !user) {
      const errorMsg = err?.message || info?.message || 'Google sign-in failed';
      return res.redirect(`http://localhost:5173/?error=${encodeURIComponent(errorMsg)}`);
    }
    req.logIn(user, (err2) => {
      if (err2) {
        return res.redirect(`http://localhost:5173/?error=${encodeURIComponent('Login after Google auth failed')}`);
      }
      res.redirect('http://localhost:5173/home');
    });
  })(req, res, next);
});

// Auth status helper
router.get('/status', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.json({ authenticated: true, user: req.user });
  }
  res.json({ authenticated: false });
});

// Logout
router.post('/logout', (req, res, next) => {
  if (typeof req.logout === 'function') {
    req.logout(err => {
      if (err) return next(err);
      res.status(204).end();
    });
  } else {
    req.session.destroy(() => res.status(204).end());
  }
});

module.exports = router;

// Local register
router.post('/register', async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already in use' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, name, email, passwordHash });
    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: 'Login after register failed' });
      res.json({ ok: true, user });
    });
  } catch (e) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Local login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info?.message || 'Unauthorized' });
    req.login(user, (err2) => {
      if (err2) return next(err2);
      return res.json({ ok: true, user });
    });
  })(req, res, next);
});


