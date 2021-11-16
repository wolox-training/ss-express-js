const user = require('./user');
const weets = require('./weets');

module.exports = { ...user, ...weets };
