const express = require('express');
const storeController = require('../controllers/store.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
  '/my-store',
  authMiddleware.protect,
  authMiddleware.restrictTo('vendor'),
  storeController.setupMyStore
);

module.exports = router;
