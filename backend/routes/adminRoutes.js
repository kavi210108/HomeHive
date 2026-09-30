const express = require("express");
const { protect, allowRoles } = require("../middleware/authMiddleware");
const {
  getPendingProviders,
  approveProvider,
  rejectProvider,
} = require("../controllers/adminController");

const router = express.Router();

router.use(protect, allowRoles("admin"));

router.get("/providers/pending", getPendingProviders);
router.put("/providers/:id/approve", approveProvider);
router.delete("/providers/:id/reject", rejectProvider);

module.exports = router;