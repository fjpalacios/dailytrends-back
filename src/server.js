const environment = process.env.NODE_ENV || 'development';
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const port = process.env.APP_PORT || 3000;
const cors = require('cors');
const feedRoutes = require('./routes/feed');
const mongoose = require('mongoose');
const elPaisScraping = require('./helpers/elpais.scraping');
const elMundoScraping = require('./helpers/elmundo.scraping');
const cron = require('node-cron');
const db = require('./db')[environment];

const app = express();

app
  .set('port', port)
  .use(cors({ origin: '*' }))
  .use(morgan('dev'))
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use('/api/v1/feed', feedRoutes);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function getFeeds() {
  elMundoScraping.getFeeds();
  elPaisScraping.getFeeds();
}

cron.schedule('*/30 * * * *', () => {
  getFeeds();
});

mongoose.Promise = global.Promise;

const dbHost = db.host;
const dbUser = db.user;
const dbPassword = db.password;
const dbDatabase = db.database;
const dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbHost}:27017/${dbDatabase}?authSource=admin`;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => {
    console.log('Successful database connection');
    getFeeds();
  })
  .catch(console.log);

module.exports = server;
