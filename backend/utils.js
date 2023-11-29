const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');

exports.generatePasswordHash = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

exports.comparePasswordHash = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

exports.generateJwtToken = (payload) => {
  const token = jwt.sign(payload, config.jwtSecret);
  return token;
};

exports.verifyJwtToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    return null;
  }
};
