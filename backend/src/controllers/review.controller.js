const Review = require('../models/review.model');

exports.createReview = async (req, res, next) => {
  try {
    // 1. Allow nested routes: /api/v1/products/PRODUCT_ID/reviews
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user.id;

    const newReview = await Review.create(req.body);

    res.status(201).json({ status: 'success', data: { review: newReview } });
  } catch (err) {
    next(err);
  }
};

exports.getAllReviews = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };

    const reviews = await Review.find(filter);
    res.status(200).json({ status: 'success', results: reviews.length, data: { reviews } });
  } catch (err) {
    next(err);
  }
};