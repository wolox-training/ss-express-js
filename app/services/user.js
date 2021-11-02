const bcrypt = require('bcryptjs');
const User = require('../models').Users;

const encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
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
