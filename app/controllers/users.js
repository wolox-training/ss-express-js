const { createUser, createSession } = require('../services/user');
const asyncWrapper = require('../utils/asycWrapper');
const { statusCodes } = require('../constants/codes');

const { getUsersInteractor } = require('../interactors/users');
const { sign } = require('../utils/crypto');

exports.newUser = asyncWrapper(async (req, res) => {
  const user = await createUser(req.body);
  return res.status(statusCodes.CREATED).json({ first_name: user.firstName });
});

exports.newSession = asyncWrapper(async (req, res) => {
  const user = await createSession(req.body);
  const token = sign({ id: user.id });
  return res.status(statusCodes.OK).json({ first_name: user.firstName, token });
});

exports.listedUsers = asyncWrapper(async (req, res) => {
  const users = await getUsersInteractor(req.query);
  return res.status(statusCodes.OK).json(users);
});
