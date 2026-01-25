const productService = require('../services/product.service');
const Store = require('../models/store.model');

exports.createProduct = async (req, res, next) => {
  try {
    // 1. Find the vendor's store first
    const store = await Store.findOne({ vendor: req.user.id });
    if (!store) throw new Error('You must create a store before adding products.');

    // 2. Create the product
    const product = await Product.create({
      ...req.body,
      store: store._id,
      vendor: req.user.id
    });

    res.status(201).json({ status: 'success', data: { product } });
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts(req.query);
    res.status(200).json({ 
        status: 'success', 
        results: products.length, 
        data: { products } 
    });
  } catch (err) {
    next(err);
  }
};