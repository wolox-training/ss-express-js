const axios = require('axios');

exports.requestPhrases = axios.create({
  baseURL: process.env.PHRASES_URL,
  timeout: 1000,
  headers: {
    accept: 'application/json'
  }
});
