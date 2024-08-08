const dotenv = require("dotenv/config");

module.exports = {
  port: process.env.PORT,
  host: process.env.HOST_NAME,
  apiKey: process.env.API_KEY
};
