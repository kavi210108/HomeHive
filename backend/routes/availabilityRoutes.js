const express = require("express");
const router = express.Router();

const {
  createAvailability,
  getMyAvailability,
  updateAvailability,
  deleteAvailability,
} = require("../controllers/availabilityController");

const { protect, allowRoles } = require("../middleware/authMiddleware");

router.post("/", protect, allowRoles("provider"), createAvailability);

router.get("/", protect, allowRoles("provider"), getMyAvailability);

router.put("/:id", protect, allowRoles("provider"), updateAvailability);

router.delete("/:id", protect, allowRoles("provider"), deleteAvailability);

module.exports = router;