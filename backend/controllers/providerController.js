const ProviderProfile = require("../models/ProviderProfile");

// Create provider profile
exports.createProfile = async (req, res) => {
  try {
    const { businessName, description, phone, address, city } = req.body;

    const existingProfile = await ProviderProfile.findOne({
      user: req.user.id,
    });

    if (existingProfile) {
      return res.status(400).json({
        message: "Provider profile already exists",
      });
    }

    const profile = await ProviderProfile.create({
      user: req.user.id,
      businessName,
      description,
      phone,
      address,
      city,
    });

    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get my provider profile
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({
      user: req.user.id,
    }).populate("user", "name email");

    if (!profile) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update my provider profile
exports.updateMyProfile = async (req, res) => {
  try {
    const { businessName, description, phone, address, city, status } =
      req.body;

    const profile = await ProviderProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        businessName,
        description,
        phone,
        address,
        city,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get provider by profile ID
exports.getProviderById = async (req, res) => {
  try {
    const provider = await ProviderProfile.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};