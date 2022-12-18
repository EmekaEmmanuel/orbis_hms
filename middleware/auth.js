const jwt = require('jsonwebtoken');

const hmsSecret = 'Our Secret';
const maxAge = 3 * 24 * 60 * 60;
exports.createToken = (id) => {
  return jwt.sign({ id }, hmsSecret, {
    expiresIn: maxAge,
  });
};
