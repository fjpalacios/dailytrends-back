/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../src/server');
const FeedSchema = require('../src/db/feed');
const helper = require('../src/helpers/feed');

const feed = {
  title: 'Hey there!',
  body: 'This is a fake body',
  image: '',
  source: 'Testing Suite Case',
  publisher: 'Javi Palacios',
};

beforeEach(async () => {
  await new FeedSchema(feed).save();
});

afterEach(async () => {
  for (let conn in mongoose.connection.collections) {
    await mongoose.connection.collections[conn].deleteMany({});
  }
});

describe('Clients', () => {
  it('can create a feed', async () => {
    const feedData = {
      title: 'Testing new feed',
      body: 'This is a fake body',
      image: '',
      source: 'Testing Suite Case',
      publisher: 'Javi Palacios',
    };
    const newFeed = await request(server)
      .post('/api/v1/feed/')
      .send({ feed: feedData });
    expect(newFeed.status).toEqual(200);
    expect(newFeed.body.message).toEqual('Feed successfully created');
    const feeds = await request(server).get('/api/v1/feed/');
    const res = await request(server).get(`/api/v1/feed/${feeds.body.feeds[0]._id}`);
    expect(res.status).toEqual(200);
    expect(res.body.feed.body).toEqual(feedData.body);
  });

  it('can get a list of feeds', async () => {
    const res = await request(server).get('/api/v1/feed/');
    expect(res.status).toEqual(200);
  });

  it('can get a single feed', async () => {
    const feeds = await request(server).get('/api/v1/feed/');
    const res = await request(server).get(`/api/v1/feed/${feeds.body.feeds[0]._id}`);
    expect(res.status).toEqual(200);
    expect(res.body.feed.body).toEqual(feed.body);
  });

  it('can update a feed', async () => {
    const feedData = {
      title: 'Testing with another title',
      body: 'This is a fake body',
      image: '',
      source: 'Testing Suite Case',
      publisher: 'Javi Palacios',
    };
    const feeds = await request(server).get('/api/v1/feed/');
    const res = await request(server).get(`/api/v1/feed/${feeds.body.feeds[0]._id}`);
    expect(res.status).toEqual(200);
    expect(res.body.feed.title).toEqual(feed.title);
    const updatedFeed = await request(server)
      .put(`/api/v1/feed/${res.body.feed._id}`)
      .send({ feed: feedData });
    expect(updatedFeed.status).toEqual(200);
    expect(updatedFeed.body.message).toEqual('Feed successfully updated');
    const feedRes = await request(server).get(`/api/v1/feed/${feeds.body.feeds[0]._id}`);
    expect(feedRes.status).toEqual(200);
    expect(feedRes.body.feed.title).toEqual(feedData.title);
  });

  it('can delete a feed', async () => {
    const feeds = await request(server).get('/api/v1/feed/');
    const res = await request(server).get(`/api/v1/feed/${feeds.body.feeds[0]._id}`);
    expect(res.status).toEqual(200);
    expect(res.body.feed.body).toEqual(feed.body);
    const deleteFeed = await request(server).delete(`/api/v1/feed/${feeds.body.feeds[0]._id}`);
    expect(deleteFeed.status).toEqual(200);
    expect(deleteFeed.body.message).toEqual('Feed successfully deleted');
    const feedRes = await request(server).get(`/api/v1/feed/${feeds.body.feeds[0]._id}`);
    expect(feedRes.status).toEqual(500);
    expect(feedRes.body.message).toEqual('Request error');
  });
});

describe('Controllers', () => {
  it('return an error message when no feeds where found', async () => {
    const feeds = await request(server).get('/api/v1/feed/');
    const res = await request(server).get(`/api/v1/feed/${feeds.body.feeds[0]._id}`);
    expect(res.status).toEqual(200);
    expect(res.body.feed.body).toEqual(feed.body);
    const deleteFeed = await request(server).delete(`/api/v1/feed/${feeds.body.feeds[0]._id}`);
    expect(deleteFeed.status).toEqual(200);
    expect(deleteFeed.body.message).toEqual('Feed successfully deleted');
    const deletedFeed = await request(server).get('/api/v1/feed/');
    expect(deletedFeed.status).toEqual(404);
    expect(deletedFeed.body.message).toEqual('No feeds found');
  });
});

describe('Helpers', () => {
  it('return properly five links', async () => {
    const links = helper.getFiveLinks('http://ep00.epimg.net/rss/elpais/portada.xml');
    links.then(data => {
      expect(data.length).toEqual(5);
    });
  });
});
