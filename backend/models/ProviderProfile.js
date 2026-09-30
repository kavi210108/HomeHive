const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    service: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, default: "" },
    experience: { type: Number, default: 0 },
    bio: { type: String, default: "" },
    verified: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProviderProfile", providerSchema);