const express = require('express');
const storeController = require('../controllers/store.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// All routes below this line are PROTECTED
router.use(authMiddleware.protect);

// Only a user with the 'vendor' role can create a store
router.post(
  '/setup', 
  authMiddleware.restrictTo('vendor'), 
  storeController.setupMyStore
);

module.exports = router;