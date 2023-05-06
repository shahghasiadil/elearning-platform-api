const Badge = require("../models/badge.model");
const User = require("../models/user.model");

const checkAndAwardBadge = async (userId) => {
  const user = await User.findById(userId).populate("badges");
  const allBadges = await Badge.find({});

  for (const badge of allBadges) {
    if (
      user.points >= badge.pointsRequired &&
      !user.badges.includes(badge.id)
    ) {
      user.badges.push(badge);
      await user.save();
    }
  }
};

module.exports = { checkAndAwardBadge };
