const getPhrases = require('../services/weet');
const asyncWrapper = require('../utils/asycWrapper');
const { statusCodes } = require('../constants/codes');

exports.getWeets = asyncWrapper(async (req, res) => {
  const phrases = await getPhrases();
  return res.status(statusCodes.OK).json(phrases);
});
