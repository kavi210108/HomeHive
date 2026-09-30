const ProviderProfile = require("../models/ProviderProfile");

// List providers waiting for approval
exports.getPendingProviders = async (req, res) => {
  try {
    const providers = await ProviderProfile.find({ verified: false }).populate("userId", "name email");
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve a provider
exports.approveProvider = async (req, res) => {
  try {
    const provider = await ProviderProfile.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    res.json({ message: "Provider approved", provider });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject (remove) a provider
exports.rejectProvider = async (req, res) => {
  try {
    const provider = await ProviderProfile.findByIdAndDelete(req.params.id);
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    res.json({ message: "Provider rejected and removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};