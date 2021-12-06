const { check } = require('express-validator');
const { errorMessages } = require('../constants/errorMessages');

exports.validateUser = [
  check('email', errorMessages.invalidEmail).custom(email => {
    if (
      !email
        .trim()
        .toLowerCase()
        .includes('@wolox')
    ) {
      throw new Error(errorMessages.invalidEmail);
    }
    return true;
  }),
  check('password', errorMessages.passwordLength).isLength({ min: 8 }),
  check('password', errorMessages.passwordNotAlphanumeric).isAlphanumeric()
];

exports.validateEmail = check('email', errorMessages.invalidEmail).custom(email => {
  if (
    !email
      .trim()
      .toLowerCase()
      .includes('@wolox')
  ) {
    throw new Error(errorMessages.invalidEmail);
  }
  return true;
});
