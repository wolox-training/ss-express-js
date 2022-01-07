const { getUsers } = require('../services/user');
const { pagination } = require('../utils/pagination');

exports.getUsersInteractor = async query => {
  const { limit, offset } = pagination(query);
  const users = await getUsers(limit, offset);
  return { users };
};
