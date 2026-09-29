const express = require("express");

const {
  createReview,
  getProviderReviews,
} = require("../controllers/reviewController");

const router = express.Router();

// Create a review
router.post("/", createReview);

// Get reviews for a provider
router.get("/provider/:providerId", getProviderReviews);

module.exports = router;