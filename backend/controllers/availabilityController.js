const Availability = require("../models/availability");
const ProviderProfile = require("../models/ProviderProfile");

exports.createAvailability = async (req, res) => {
  try {
    const { dayOfWeek, startTime, endTime, isAvailable } = req.body;

    const provider = await ProviderProfile.findOne({
      user: req.user.id,
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    const availability = await Availability.create({
      provider: provider._id,
      dayOfWeek,
      startTime,
      endTime,
      isAvailable,
    });

    res.status(201).json(availability);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyAvailability = async (req, res) => {
  try {
    const provider = await ProviderProfile.findOne({
      user: req.user.id,
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    const availability = await Availability.find({
      provider: provider._id,
    });

    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const { dayOfWeek, startTime, endTime, isAvailable } = req.body;

    const provider = await ProviderProfile.findOne({
      user: req.user.id,
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    const availability = await Availability.findOneAndUpdate(
      {
        _id: req.params.id,
        provider: provider._id,
      },
      {
        dayOfWeek,
        startTime,
        endTime,
        isAvailable,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!availability) {
      return res.status(404).json({
        message: "Availability not found",
      });
    }

    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAvailability = async (req, res) => {
  try {
    const provider = await ProviderProfile.findOne({
      user: req.user.id,
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    const availability = await Availability.findOneAndDelete({
      _id: req.params.id,
      provider: provider._id,
    });

    if (!availability) {
      return res.status(404).json({
        message: "Availability not found",
      });
    }

    res.json({
      message: "Availability deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};