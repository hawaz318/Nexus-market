const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { promisify } = require('util');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // 1. Get token from Header or Cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({ message: 'You are not logged in. Please log in to get access.' });
    }

    // 2. Verify token (Checking if the secret key matches)
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: 'The user belonging to this token no longer exists.' });
    }

    // 4. GRANT ACCESS to protected route
    // We attach the user to the 'req' object so the next function knows who is logged in
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token. Please log in again.' });
  }
};

// ADVANCED: Role-Based Access Control (RBAC)
// This limits access to specific roles (e.g., only 'admin' or 'vendor')
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // req.user was set by the 'protect' middleware above
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'You do not have permission to perform this action' 
      });
    }
    next();
  };
};