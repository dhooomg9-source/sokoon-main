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

const urls = [
  "https://www.soundboxacoustic.com/engineering-acoustic-system/ceiling-absorber/",
  "https://www.soundboxacoustic.com/engineering-acoustic-system/rounded-ceiling-absorber/",
  "https://www.soundboxacoustic.com/engineering-acoustic-system/magic-block-acoustic-panel/",
  "https://www.soundboxacoustic.com/engineering-acoustic-system/fabric-acoustic-panel/",
  "https://www.soundboxacoustic.com/engineering-acoustic-system/designed-fabric-acoustic-panel/",
  "https://www.soundboxacoustic.com/engineering-acoustic-system/mls-acoustic-diffuser-unit/",
  "https://www.soundboxacoustic.com/engineering-acoustic-system/qrd-acoustic-diffuser-unit/",
  "https://www.soundboxacoustic.com/engineering-acoustic-system/acoustic-diffuser-panel/",
  "https://www.soundboxacoustic.com/engineering-acoustic-system/grooved-acoustic-panel/",
  "https://www.soundboxacoustic.com/engineering-acoustic-system/perforated-acoustic-panel/",
  "https://www.soundboxacoustic.com/engineering-acoustic-system/acoustic-wool/"
];

async function scrapeProduct(url) {
  try {
    const html = await fetch(url);
    
    // Title
    const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i) || html.match(/<title>(.*?)<\/title>/i);
    let title = titleMatch ? titleMatch[1].replace(/&#[0-9]+;/g, '').replace(/<[^>]+>/g, '').trim() : "Unknown Product";
    if (title.includes(" - SoundBox")) title = title.split(" - SoundBox")[0];
    
    // Description (from meta description or first p tag)
    const descMatch = html.match(/<meta[^>]*property=\"og:description\"[^>]*content=\"([^\"]+)\"/i) || 
                      html.match(/<meta[^>]*name=\"description\"[^>]*content=\"([^\"]+)\"/i);
    let description = descMatch ? descMatch[1] : "";

    // Image (from og:image or first big image)
    const imgMatch = html.match(/<meta[^>]*property=\"og:image\"[^>]*content=\"([^\"]+)\"/i);
    let img = imgMatch ? imgMatch[1] : "";

    // Fallbacks
    if (!img) {
      const firstImg = html.match(/<img[^>]+src=\"(https:\/\/www\.soundboxacoustic\.com\/wp-content\/uploads\/[^\"]+)\"/i);
      if (firstImg) img = firstImg[1];
    }
    
    return {
      title,
      url,
      slug: url.split('/').filter(Boolean).pop(),
      categorySlug: "acoustic-wall-panels",
      img,
      description,
      docs: [],
      gallery: [img],
      sections: {
        "technical-specification": ""
      }
    };
  } catch(e) {
    console.error("Failed on", url, e);
    return null;
  }
}

async function run() {
  const results = [];
  for (let url of urls) {
    const data = await scrapeProduct(url);
    if (data) results.push(data);
  }
  
  const fs = require('fs');
  fs.writeFileSync('./src/data/soundbox_scraped.json', JSON.stringify(results, null, 2));
  console.log('Done scraping ' + results.length + ' products.');
}

run();
