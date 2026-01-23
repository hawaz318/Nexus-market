const storeService = require('../services/store.service');

exports.setupMyStore = async (req, res, next) => {
  try {
    // We get the vendor ID directly from the logged-in user's request
    const vendorId = req.user.id;
    
    const store = await storeService.createStore(vendorId, req.body);

    res.status(201).json({
      status: 'success',
      data: { store }
    });
  } catch (err) {
    next(err);
  }
};