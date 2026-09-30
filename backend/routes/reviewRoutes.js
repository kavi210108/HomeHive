const express = require("express");
const Review = require("../models/Review.js");

const router = express.Router();
 console.log("Review model:", typeof Review, typeof Review.find);

router.post("/", async (req, res) => {
  try {
    const { customerName, providerName, rating, comment } = req.body;

    const review = new Review({
      customerName,
      providerName,
      rating,
      comment
    });

    const savedReview = await review.save();

    res.status(201).json({
      message: "Review created successfully",
      review: savedReview
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create review",
      error: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch reviews",
      error: error.message
    });
  }
});

module.exports = router;