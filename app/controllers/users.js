const { createUser } = require('../services/user');
const asyncWrapper = require('../utils/asycWrapper');

exports.newUser = asyncWrapper(async (req, res) => {
  const user = await createUser(req.body);
  return res.status(201).json({ first_name: user.firstName });
});
