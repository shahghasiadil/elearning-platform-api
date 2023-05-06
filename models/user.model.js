const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password must not contain the word "password"');
      }
    },
  },
  role: { type: String, default: "student" },
  tokens: [
    {
      token: {
        type: String,
        required: false,
      },
    },
  ],
  points: {
    type: Number,
    default: 0,
  },
  badges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Badge",
    },
  ],
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

module.exports = mongoose.model("User", userSchema);
