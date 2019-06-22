require('dotenv').config();

module.exports = {
  test: {
    host: process.env.TEST_DB_HOST,
    user: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
  },

  development: {
    host: process.env.DEV_DB_HOST,
    user: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
  },

  production: {
    host: process.env.PROD_DB_HOST,
    user: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
  },
};
