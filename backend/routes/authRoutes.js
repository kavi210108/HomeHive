const express = require("express");

const { register, login, getMe } = require("../controllers/authController");

const { protect, allowRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", protect, getMe);

router.get("/provider-test", protect, allowRoles("provider"), (req, res) => {
  res.json({ message: "Provider access granted" });
});

module.exports = router;