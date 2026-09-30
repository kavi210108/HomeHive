const Booking = require("../models/booking");
const ProviderProfile = require("../models/providerProfile");
const Service = require("../models/service");

exports.createBooking = async (req, res) => {
  try {
    const { provider, service, bookingDate, startTime, endTime } = req.body;

    const serviceData = await Service.findById(service);

    if (!serviceData) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    if (serviceData.provider.toString() !== provider) {
      return res.status(400).json({
        message: "Service does not belong to this provider",
      });
    }

    const providerProfile = await ProviderProfile.findById(provider);

    if (!providerProfile) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    const booking = await Booking.create({
      customer: req.user.id,
      provider,
      service,
      bookingDate,
      startTime,
      endTime,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customer: req.user.id,
    })
      .populate("provider")
      .populate("service");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProviderBookings = async (req, res) => {
  try {
    const provider = await ProviderProfile.findOne({
      user: req.user.id,
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    const bookings = await Booking.find({
      provider: provider._id,
    })
      .populate("customer", "name email")
      .populate("service");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const provider = await ProviderProfile.findOne({
      user: req.user.id,
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider profile not found",
      });
    }

    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        provider: provider._id,
      },
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};