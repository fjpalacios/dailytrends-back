const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feed = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: String,
  source: { type: String, required: true },
  publisher: { type: String, required: true },
});

module.exports = mongoose.model('feed', feed);
