const Review = require("../models/Review");

// Create a review
const createReview = async (req, res) => {
  try {
    const { user, provider, rating, comment } = req.body;

    const review = await Review.create({
      user,
      provider,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create review",
      error: error.message,
    });
  }
};

// Get reviews for a provider
const getProviderReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      provider: req.params.providerId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

module.exports = {
  createReview,
  getProviderReviews,
};