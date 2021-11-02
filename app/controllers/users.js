const { createUser } = require('../services/user');
const asyncWrapper = require('../utils/asycWrapper');
const { statusCodes } = require('../constants/codes');

exports.newUser = asyncWrapper(async (req, res) => {
  const user = await createUser(req.body);
  return res.status(statusCodes.CREATED).json({ first_name: user.firstName });
});
