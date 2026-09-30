const express = require("express");

const router = express.Router();

const {
  createProfile,
  getMyProfile,
  updateMyProfile,
  getProviderById,
} = require("../controllers/providerController");

const { protect, allowRoles } = require("../middleware/authMiddleware");

router.post("/profile", protect, allowRoles("provider"), createProfile);

router.get("/profile", protect, allowRoles("provider"), getMyProfile);

router.put("/profile", protect, allowRoles("provider"), updateMyProfile);

router.get("/:id", getProviderById);

module.exports = router;