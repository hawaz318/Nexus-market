const express = require('express');
const orderController = require('../controllers/order.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

// All order routes require being logged in
router.use(protect);

// Customers can place orders
router.post('/checkout', orderController.placeOrder);

// Customers can see their own order history
// (You'll need a getMyOrders function in your controller for this)
// router.get('/my-orders', orderController.getUserOrders);

module.exports = router;