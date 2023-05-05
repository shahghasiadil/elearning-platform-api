const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const registerUser = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Invalid credentials.' });
  }
};

// Rest of the user-related controller methods...

module.exports = {
  registerUser,
  loginUser,
  // Rest of the methods...
};
