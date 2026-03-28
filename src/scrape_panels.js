import https from 'https';

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
    const html = await fetch('https://abstracta.se/products/product-category/acoustic-wall-panels/');
    const regex = /<a[^>]+href=[\"'](https:\/\/abstracta\.se\/product\/[^\"']+)[\"'][^>]*>/gi;
    const urls = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      urls.push(match[1]);
    }
    const uniqueUrls = [...new Set(urls)];
    console.log(JSON.stringify(uniqueUrls, null, 2));
  } catch (e) {
    console.error(e);
  }
}

scrape();
