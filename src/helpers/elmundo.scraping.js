const feed = require('./feed');
const FeedModel = require('../models/feed');
const fm = new FeedModel();

async function getFeed(url) {
  const page = await feed.getConnection(url);
  const result = await page.evaluate(() => {
    const title = document.querySelector('.ue-c-article__headline').innerHTML;
    const body =
      '<p>' +
      [...document.querySelectorAll('.ue-c-article__body > p')]
        .map(element => element.innerHTML)
        .join('</p><p>') +
      '</p>';
    let image = document.querySelector('.ue-c-article__media--image > img');
    image ? (image = image.src) : (image = '');
    const source = 'El Mundo';
    let publisher = document.querySelector('.ue-c-article__byline-name > a');
    publisher
      ? (publisher = publisher.innerHTML)
      : (publisher = document.querySelector('.ue-c-article__byline-name').innerHTML);
    const feed = {
      title,
      body,
      image,
      source,
      publisher,
    };
    return feed;
  });
  await page.close();
  return result;
}

exports.getFeeds = async function() {
  const links = await feed.getFiveLinks('https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml');
  await links.forEach(link => {
    getFeed(link)
      .then(fm.create)
      .catch(console.log);
  });
};
