require('dotenv-safe').config();

module.exports = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV
};
