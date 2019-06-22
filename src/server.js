require('dotenv').config();

const express = require('express');
const port = process.env.APP_PORT || 3000;
const feedRoutes = require('./routes/feed');
const mongoose = require('mongoose');
const elPaisScraping = require('./helpers/elpais.scraping');
const elMundoScraping = require('./helpers/elmundo.scraping');
const cron = require('node-cron');

const app = express();

app
  .set('port', port)
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

const dbUser = process.env.DEV_DB_USERNAME;
const dbPassword = process.env.DEV_DB_PASSWORD;
const dbUrl = `mongodb://${dbUser}:${dbPassword}@db:27017/dailytrends?authSource=admin`;

mongoose
  .connect(dbUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('Successful database connection');
    getFeeds();
  })
  .catch(console.log);

module.exports = server;
