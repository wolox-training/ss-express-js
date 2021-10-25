const axios = require('axios');
const config = require('../../config/index');

exports.requestPhrases = axios.create({
  baseURL: config.common.api.baseURL,
  timeout: 1000,
  headers: {
    accept: 'application/json'
  },
  method: 'get'
});
