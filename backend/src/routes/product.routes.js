const express = require('express');
const productController = require('../controllers/product.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

// PUBLIC: Anyone can browse products
router.get('/', productController.getProducts);

// PRIVATE: Only logged-in Vendors can add products
router.post(
  '/', 
  protect, 
  restrictTo('vendor'), 
  productController.createProduct
);

module.exports = router;