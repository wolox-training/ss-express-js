const jwt = require('jsonwebtoken');
const { createUser, createSession } = require('../services/user');
const asyncWrapper = require('../utils/asycWrapper');
const { statusCodes } = require('../constants/codes');
const config = require('../../config/index');

exports.newUser = asyncWrapper(async (req, res) => {
  const user = await createUser(req.body);
  return res.status(statusCodes.CREATED).json({ first_name: user.firstName });
});

exports.newSession = asyncWrapper(async (req, res) => {
  const user = await createSession(req.body);
  const token = jwt.sign(
    {
      id: user.id
    },
    config.common.api.secret,
    { expiresIn: '1h' }
  );
  return res.status(statusCodes.OK).json({ first_name: user.firstName, token });
});
