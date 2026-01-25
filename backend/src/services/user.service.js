const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// 🔹 Password validation function
const validatePassword = (password) => {
  // Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

// 🔹 Create user (signup)
exports.createUser = async (userData) => {
  // 1️⃣ Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // 2️⃣ Validate password
  if (!validatePassword(userData.password)) {
    throw new Error('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.');
  }

  // 3️⃣ Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 12);

  // 4️⃣ Create user
  const newUser = await User.create({
    ...userData,
    password: hashedPassword
  });

  // 5️⃣ Remove password before returning
  newUser.password = undefined;
  return newUser;
};

// 🔹 Check login credentials
exports.checkUserCredentials = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Incorrect email or password');
  }

  // Remove password before returning
  user.password = undefined;
  return user;
};

// 🔹 Generate reset token (forgot password)
exports.generatePasswordResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    return null; // don't reveal if email exists
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save({ validateBeforeSave: false });

  return resetToken;
};

// 🔹 Reset password
exports.resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error('Token invalid or expired');
  }

  // Validate new password
  if (!validatePassword(newPassword)) {
    throw new Error('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.');
  }

  // Hash new password
  user.password = await bcrypt.hash(newPassword, 12);

  // Clear reset token
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();
  user.password = undefined;
  return user;
};
