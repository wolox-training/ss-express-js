const { createUser } = require('../services/user');
const asyncWrapper = require('../utils/asycWrapper');

exports.newUser = asyncWrapper(async (req, res) => {
  const user = await createUser(req.body);
  return res.status(200).json({ first_name: user.firstName });
});
