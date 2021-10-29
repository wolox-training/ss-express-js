const { validationResult } = require('express-validator');
const { validationError } = require('../errors');

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) throw validationError(errors.array());

  return next();
};

module.exports = checkValidations;
