const jwt = require('jsonwebtoken');
const config = require('../../config/index');

exports.sign = payload => {
  const token = jwt.sign(payload, config.common.api.secret, { expiresIn: '1h' });
  return token;
};
