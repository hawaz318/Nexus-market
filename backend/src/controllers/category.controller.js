const Category = require('../models/category.model');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate('parentCategory');
    res.status(200).json({ status: 'success', data: { categories } });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({ status: 'success', data: { category: newCategory } });
  } catch (err) {
    next(err);
  }
};