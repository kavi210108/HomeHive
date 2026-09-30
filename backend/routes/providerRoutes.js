const express = require("express");
const { protect, allowRoles } = require("../middleware/authMiddleware");
const {
  saveMyProfile,
  getMyProfile,
  searchProviders,
  getProviderById,
} = require("../controllers/providerController");

const router = express.Router();

router.get("/", searchProviders);
router.get("/me", protect, allowRoles("provider"), getMyProfile);
router.post("/me", protect, allowRoles("provider"), saveMyProfile);
router.get("/:id", getProviderById);

module.exports = router;