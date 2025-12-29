// src/routes/user.routes.js
const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/signup', userController.signup);

// Example of a Protected Route
// Only logged-in users can see their profile
router.get('/me', authMiddleware.protect, userController.getMe);

// Example of a Restricted Route
// Only 'admin' users can see all users
router.get('/all-users', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('admin'), 
  userController.getAllUsers
);

module.exports = router;