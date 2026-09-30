const Service = require("../models/service");
const ProviderProfile = require("../models/ProviderProfile");

exports.createService = async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;

    const provider = await ProviderProfile.findOne({
      user: req.user.id,
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    const service = await Service.create({
      provider: provider._id,
      name,
      description,
      price,
      duration,
    });

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyServices = async (req, res) => {
  try {
    const provider = await ProviderProfile.findOne({
      user: req.user.id,
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    const services = await Service.find({
      provider: provider._id,
    });

    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { name, description, price, duration, status } = req.body;

    const provider = await ProviderProfile.findOne({
      user: req.user.id,
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    const service = await Service.findOneAndUpdate(
      {
        _id: req.params.id,
        provider: provider._id,
      },
      {
        name,
        description,
        price,
        duration,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const provider = await ProviderProfile.findOne({
      user: req.user.id,
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    const service = await Service.findOneAndDelete({
      _id: req.params.id,
      provider: provider._id,
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json({
      message: "Service deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};