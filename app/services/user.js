const bcrypt = require('bcryptjs');
const User = require('../models/user');

const encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

exports.createUser = async data => {
  const hash = encryptPassword(data.password);
  const newUser = await User.create({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email.trim().toLowerCase(),
    password: hash
  });
  return newUser;
};
