const FeedSchema = require('../db/feed');

class FeedModel {
  create(feed) {
    let newFeed = FeedSchema(feed);
    FeedSchema.find({ title: feed.title }).then(data => {
      if (data.length === 0) newFeed.save();
    });
  }

  getAll() {}

  getOne(id) {}

  update(id, feed) {}

  delete(id) {}
}

module.exports = FeedModel;
