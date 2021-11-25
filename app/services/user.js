const bcrypt = require('bcryptjs');
const User = require('../models').Users;
const { validationError } = require('../errors');
const { errorMessages } = require('../constants/errorMessages');

const encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (bodyPassword, databasePassword) => {
  const compare = await bcrypt.compare(bodyPassword, databasePassword);
  return compare;
};

exports.createUser = async data => {
  const hash = await encryptPassword(data.password);
  return User.create({
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email.trim().toLowerCase(),
    password: hash
  });
};

exports.createSession = async data => {
  const user = await User.findOne({
    where: {
      email: data.email.trim().toLowerCase()
    }
  });

  if (!user) throw validationError(errorMessages.userNotFound);
  const isEqual = await comparePassword(data.password, user.password);
  if (!isEqual) throw validationError(errorMessages.wrongPassword);
  return user;
};
