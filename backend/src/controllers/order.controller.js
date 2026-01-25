const orderService = require('../services/order.service');

exports.placeOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.user.id, req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Order placed successfully',
      data: { order }
    });
  } catch (err) {
    next(err);
  }
};