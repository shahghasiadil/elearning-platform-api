const Badge = require("../models/badge.model");

const createBadge = async (req, res) => {
  const badge = new Badge(req.body);

  try {
    await badge.save();
    res.status(201).json(badge);
  } catch (error) {
    res.status(400).json({ error: "Error creating badge" });
  }
};

const getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find({});
    res.status(200).json(badges);
  } catch (error) {
    res.status(500).json({ error: "Error fetching badges" });
  }
};

const updateBadge = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "pointsRequired"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).json({ error: "Invalid updates" });
  }

  try {
    const badge = await Badge.findById(req.params.badgeId);

    if (!badge) {
      return res.status(404).json({ error: "Badge not found" });
    }

    updates.forEach((update) => (badge[update] = req.body[update]));
    await badge.save();
    res.status(200).json(badge);
  } catch (error) {
    res.status(500).json({ error: "Error updating badge" });
  }
};

const deleteBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndDelete(req.params.badgeId);

    if (!badge) {
      return res.status(404).json({ error: "Badge not found" });
    }

    res.status(200).json({ message: "Badge deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting badge" });
  }
};

module.exports = {
  createBadge,
  getAllBadges,
  updateBadge,
  deleteBadge,
};
