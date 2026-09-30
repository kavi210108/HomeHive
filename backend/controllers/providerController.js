const ProviderProfile = require("../models/ProviderProfile");

// Provider creates or updates own profile
exports.saveMyProfile = async (req, res) => {
  try {
    const { service, price, location, experience, bio } = req.body;
    const profile = await ProviderProfile.findOneAndUpdate(
      { userId: req.user.id },
      { service, price, location, experience, bio },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyProfile = async (req, res) => {
  const profile = await ProviderProfile.findOne({ userId: req.user.id });
  res.json(profile);
};

// Public: only verified providers, with filters
exports.searchProviders = async (req, res) => {
  try {
    const { service, maxPrice, minRating } = req.query;
    const filter = { verified: true };
    if (service) filter.service = new RegExp(service, "i");
    if (maxPrice) filter.price = { $lte: Number(maxPrice) };
    if (minRating) filter.rating = { $gte: Number(minRating) };
    const providers = await ProviderProfile.find(filter).populate("userId", "name email");
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProviderById = async (req, res) => {
  try {
    const provider = await ProviderProfile.findById(req.params.id).populate("userId", "name email");
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};