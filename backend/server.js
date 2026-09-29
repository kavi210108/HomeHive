const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const path = require("path");
const reviewRoutes = require(path.join(__dirname, "routes", "reviewRoutes.js"));

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "HomeHive Backend is Running!"
  });
});

// Review routes
app.use("/api/reviews", reviewRoutes);

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`HomeHive Backend running on port ${PORT}`);
});