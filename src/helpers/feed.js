const Parser = require('rss-parser');
const puppeteer = require('puppeteer');

let parser = new Parser();

exports.getFiveLinks = async function(url) {
  let links = [];
  let feed = await parser.parseURL(url);
  feed.items.slice(0, 5).forEach(item => {
    links.push(item.link);
  });
  return links;
};

exports.getConnection = async function(url) {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--disable-dev-shm-usage', '--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(url);
  return page;
};
