const express = require('express');
const categoryController = require('../controllers/category.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.post('/', protect, restrictTo('admin'), categoryController.createCategory);

module.exports = router;