const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// 🔹 Generate JWT
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// 🔹 Signup
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser }
    });
  } catch (err) {
    next(err);
  }
};

// 🔹 Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check email & password exist
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Please provide email and password!' });
    }

    // 2. Check user exists & password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ status: 'error', message: 'Incorrect email or password' });
    }

    // 3. Generate token
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: { user }
    });
  } catch (err) {
    next(err);
  }
};
