const axios = require('axios');

const strapiClient = axios.create({
  baseURL: 'http://strapi.koders.in/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

module.exports = strapiClient;
