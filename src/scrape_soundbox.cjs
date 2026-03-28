const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrape() {
  try {
    const html = await fetch('https://www.soundboxacoustic.com/engineering-acoustic-system/');
    // simple regex to find links to products
    // typical structure: <a href="https://www.soundboxacoustic.com/product/..." >
    const regex = /href=[\"'](https:\/\/www\.soundboxacoustic\.com\/product\/[^\"']+)[\"']/gi;
    const urls = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      urls.push(match[1]);
    }
    const uniqueUrls = [...new Set(urls)];
    console.log("Found product URLs:", uniqueUrls);
  } catch (e) {
    console.error(e);
  }
}

scrape();
