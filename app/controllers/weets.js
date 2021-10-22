const getPhrases = require('../services/weet');
const asyncWrapper = require('../utils/asycWrapper');

exports.getWeets = asyncWrapper(async (req, res) => {
  const phrases = await getPhrases();
  return res.status(200).json(phrases);
});
