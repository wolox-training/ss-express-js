const bcrypt = require('bcryptjs');
const User = require('../models').Users;

const encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

exports.createUser = async data => {
  const hash = await encryptPassword(data.password);
  const newUser = await User.create({
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email.trim().toLowerCase(),
    password: hash
  });
  return newUser;
};
