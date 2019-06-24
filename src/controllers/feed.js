const FeedModel = require('../models/feed');
const fm = new FeedModel();

class FeedController {
  async create(req, res) {
    const feed = req.body.feed;
    if (!feed) return res.status(500).send({ message: 'No feed data available' });
    await fm
      .create(feed)
      .then(data => {
        return res.status(200).send({
          message: 'Feed successfully created',
          id: data.id,
        });
      })
      .catch(() => {
        return res.status(500).send({ message: 'Request error' });
      });
  }

  async getAll(req, res) {
    await fm
      .getAll()
      .then(feeds => {
        if (feeds.length === 0) {
          return res.status(404).send({ message: 'No feeds found' });
        }
        return res.status(200).send({ feeds });
      })
      .catch(() => {
        return res.status(500).send({ message: 'Request error' });
      });
  }

  async getOne(req, res) {
    const id = req.params.id;
    await fm
      .getOne(id)
      .then(feed => {
        if (feed.length === 0) {
          return res.status(404).send({ message: 'No feed found' });
        }
        return res.status(200).send({ feed });
      })
      .catch(() => {
        return res.status(500).send({ message: 'Request error' });
      });
  }

  async getLastFive(req, res) {
    await fm
      .getLastFive()
      .then(feeds => {
        if (feeds.length === 0) {
          return res.status(404).send({ message: 'No feeds found' });
        }
        return res.status(200).send({ feeds });
      })
      .catch(() => {
        return res.status(500).send({ message: 'Request error' });
      });
  }

  async update(req, res) {
    const id = req.params.id;
    const feed = req.body.feed;
    if (!feed) return res.status(500).send({ message: 'No feed data available' });
    await fm
      .update(id, feed)
      .then(feed => {
        if (feed.isModified) {
          return res.status(200).send({ message: 'Feed successfully updated' });
        }
      })
      .catch(() => {
        return res.status(500).send({ message: 'Request error' });
      });
  }

  async delete(req, res) {
    const id = req.params.id;
    await fm
      .delete(id)
      .then(feed => {
        if (feed.isModified) {
          return res.status(200).send({ message: 'Feed successfully deleted' });
        }
      })
      .catch(() => {
        return res.status(500).send({ message: 'Request error' });
      });
  }
}

module.exports = FeedController;
