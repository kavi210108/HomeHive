const express = require("express");
const router = express.Router();

const {
  createService,
  getMyServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const { protect, allowRoles } = require("../middleware/authMiddleware");

router.post("/", protect, allowRoles("provider"), createService);

router.get("/", protect, allowRoles("provider"), getMyServices);

router.put("/:id", protect, allowRoles("provider"), updateService);

router.delete("/:id", protect, allowRoles("provider"), deleteService);

module.exports = router;