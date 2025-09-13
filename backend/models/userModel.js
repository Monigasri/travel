// backend/models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  name: { type: String, required: true },
  username: { type: String },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  passwordHash: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
