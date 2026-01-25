const storeService = require('../services/store.service');
const cloudinaryService = require('../services/cloudinary.service');

exports.setupMyStore = async (req, res, next) => {
  try {
    let logoUrl;

    if (req.file) {
      logoUrl = await cloudinaryService.uploadToCloudinary(req.file.buffer);
    }

    // 2. Add the logo URL to the store data
    const storeData = { ...req.body, logo: logoUrl };
    
    const store = await storeService.createStore(req.user.id, storeData);

    res.status(201).json({ status: 'success', data: { store } });
  } catch (err) {
    next(err);
  }
};