const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getProviderBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

const { protect, allowRoles } = require("../middleware/authMiddleware");

// Customer routes
router.post("/", protect, allowRoles("customer"), createBooking);

router.get("/my", protect, allowRoles("customer"), getMyBookings);

// Provider routes
router.get(
  "/provider",
  protect,
  allowRoles("provider"),
  getProviderBookings
);

router.put(
  "/:id/status",
  protect,
  allowRoles("provider"),
  updateBookingStatus
);

module.exports = router;