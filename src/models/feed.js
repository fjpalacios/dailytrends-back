const FeedSchema = require('../db/feed');

class FeedModel {
  create(feed) {
    if (feed.image === 'https://ep00.epimg.net/t.gif') {
      feed.image = '';
    }
    return new FeedSchema(feed).save();
  }

  getAll() {
    return FeedSchema.find().sort({ _id: -1 });
  }

  getOne(id) {
    return FeedSchema.findById(id);
  }

  update(id, feed) {
    return FeedSchema.findByIdAndUpdate(id, feed);
  }

  delete(id) {
    return FeedSchema.findByIdAndDelete(id);
  }
}

module.exports = FeedModel;
