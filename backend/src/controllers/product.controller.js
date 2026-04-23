const productService = require('../services/product.service');
const Store = require('../models/store.model');
const APIFeatures = require('../utils/apiFeatures');
const Product = require('../models/product.model');

exports.createProduct = async (req, res, next) => {
  try {
    // If an image was uploaded, Multer adds 'file' to the request object
    if (req.file) {
      req.body.image = req.file.path; // This is the Cloudinary URL
    }

    const newProduct = await Product.create({
      ...req.body,
      store: req.user.storeId // Assuming you link the vendor to their store
    });

    res.status(201).json({
      status: 'success',
      data: { product: newProduct }
    });
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    // Execute the features
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .paginate();

    const products = await features.query;

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: { products }
    });
  } catch (err) {
    next(err);
  }
};