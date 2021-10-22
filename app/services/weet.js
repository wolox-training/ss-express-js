const { requestPhrases } = require('../utils/api');

async function getPhrases() {
  const { data: phrases } = await requestPhrases('/api?format=json');
  return phrases;
}

module.exports = getPhrases;
