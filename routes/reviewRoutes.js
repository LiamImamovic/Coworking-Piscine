const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router
    .route('/')
    .get(reviewController.findAllReviews)
    .post(reviewController.createReview);
module.exports = router;