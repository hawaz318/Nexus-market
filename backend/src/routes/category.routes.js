const express = require('express');
const categoryController = require('../controllers/category.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

// PUBLIC ROUTES
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// PROTECTED ADMIN ROUTES
router.post('/', protect, restrictTo('admin'), categoryController.createCategory);
router.put('/:id', protect, restrictTo('admin'), categoryController.updateCategory);
router.delete('/:id', protect, restrictTo('admin'), categoryController.deleteCategory);

module.exports = router;
