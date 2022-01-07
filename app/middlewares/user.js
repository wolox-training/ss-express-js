const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const { errorMessages } = require('../constants/errorMessages');
const { tokenExpiredError, tokenInvalidError } = require('../errors');

const checkAuthorization = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.common.api.secret, err => {
    if (err) {
      if (err.name === 'TokenExpiredError') return next(tokenExpiredError(errorMessages.tokenExpiredError));
      if (err.name === 'JsonWebTokenError') return next(tokenInvalidError(errorMessages.jsonWebTokenError));
    }
    return next();
  });
};

module.exports = checkAuthorization;
