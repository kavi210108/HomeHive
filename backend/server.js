const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("HomeHive API running"));

// Auth routes
app.use("/api/auth", require("./routes/authRoutes"));

// Provider routes
app.use("/api/providers", require("./routes/providerRoutes"));

// Service routes
app.use("/api/services", require("./routes/serviceRoutes"));

// Availability routes
app.use("/api/availability", require("./routes/availabilityRoutes"));

// Booking routes
app.use("/api/bookings", require("./routes/bookingRoutes"));

// Review routes
app.use("/api/reviews", require("./routes/reviewRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});