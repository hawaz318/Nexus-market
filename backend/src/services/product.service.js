const Product = require('../models/product.model');

exports.getAllProducts = async (queryObject) => {
  // 1. FILTERING (e.g., ?category=Fashion&price[gte]=100)
  const queryObj = { ...queryObject };
  const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
  excludedFields.forEach(el => delete queryObj[el]);

  // Advanced: Convert 'gte' to '$gte' for MongoDB syntax
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  let query = Product.find(JSON.parse(queryStr));

  // 2. SEARCH (e.g., ?search=iphone)
  if (queryObject.search) {
    query = query.find({ $text: { $search: queryObject.search } });
  }

  // 3. SORTING (e.g., ?sort=-price)
  if (queryObject.sort) {
    query = query.sort(queryObject.sort.split(',').join(' '));
  } else {
    query = query.sort('-createdAt'); // Default: Newest first
  }

  return await query;
};