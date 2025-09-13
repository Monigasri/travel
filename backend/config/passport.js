require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          username: profile.username || profile.displayName?.replace(/\s+/g, '').toLowerCase(),
          email: profile.emails[0].value,
          avatarUrl: profile.photos && profile.photos[0] ? profile.photos[0].value : undefined,
        });
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
));

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user || !user.passwordHash) return done(null, false, { message: 'Invalid credentials' });
      const bcrypt = require('bcryptjs');
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return done(null, false, { message: 'Invalid credentials' });
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
