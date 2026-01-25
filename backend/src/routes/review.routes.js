const express = require('express');
const reviewController = require('../controllers/review.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router({ mergeParams: true }); // Advanced: merges params from product route

router.use(protect); // Only logged-in users can review

router.route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview);

module.exports = router;