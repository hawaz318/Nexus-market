const userService = require('../services/user.service');
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
    const newUser = await userService.createUser(req.body);

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

    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Please provide email and password!' });
    }

    const user = await userService.checkUserCredentials(email, password);
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: { user }
    });
  } catch (err) {
    res.status(401).json({ status: 'error', message: err.message });
  }
};

// 🔹 Forgot Password
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const resetToken = await userService.generatePasswordResetToken(email);

    const resetURL = resetToken
      ? `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`
      : null;

    res.status(200).json({
      status: 'success',
      message: 'If email exists, a reset link has been sent.',
      resetURL // for dev/testing, send link here
    });
  } catch (err) {
    next(err);
  }
};

// 🔹 Reset Password
exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await userService.resetPassword(token, password);

    res.status(200).json({
      status: 'success',
      message: 'Password reset successful',
      data: { user }
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};
