const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  pointsRequired: {
    type: Number,
    required: true,
  },
});

const Badge = mongoose.model("Badge", badgeSchema);
module.exports = Badge;
