const Order = require('../models/order.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');

exports.createOrder = async (userId, orderData) => {
  // Start a Transaction Session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let totalAmount = 0;

    // 1. Verify Stock and Calculate Total
    for (const item of orderData.items) {
      const product = await Product.findById(item.product).session(session);
      
      if (!product || product.stock < item.quantity) {
        throw new Error(`Product ${product?.name || 'Unknown'} is out of stock!`);
      }

      // 2. Decrease Stock
      product.stock -= item.quantity;
      await product.save({ session });

      totalAmount += product.price * item.quantity;
    }

    // 3. Create the Order
    const order = await Order.create([{
      user: userId,
      items: orderData.items,
      totalAmount,
      shippingAddress: orderData.shippingAddress
    }], { session });

    // 4. If everything is good, save changes permanently
    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    // If ANY step fails, undo everything (Rollback)
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};