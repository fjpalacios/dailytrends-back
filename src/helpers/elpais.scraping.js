const feed = require('./feed');
const FeedModel = require('../models/feed');
const fm = new FeedModel();

async function getFeed(url) {
  const page = await feed.getConnection(url);
  const result = await page.evaluate(() => {
    const title = document.querySelector('.articulo-titulo').innerHTML;
    const body =
      '<p>' +
      [...document.querySelectorAll('.articulo-cuerpo > p')]
        .map(element => element.innerHTML)
        .join('</p><p>') +
      '</p>';
    let image = document.querySelector('.foto > img');
    image ? (image = image.src) : (image = '');
    const source = 'El País';
    const publisher = document.querySelector('.autor-nombre > a').innerHTML;
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
  const links = await feed.getFiveLinks('http://ep00.epimg.net/rss/elpais/portada.xml');
  await links.forEach(link => {
    getFeed(link)
      .then(fm.create)
      .catch(console.log);
  });
};
