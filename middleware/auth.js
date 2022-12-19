const jwt = require('jsonwebtoken');

const hmsSecret = 'Our Secret';
const maxAge = 3 * 24 * 60 * 60;

exports.createToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, hmsSecret, {
    expiresIn: maxAge,
  });
};
