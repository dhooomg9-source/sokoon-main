const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

const categories = {
  'absorbers': [
    '/easy-acoustic-system/walleasear-sound-absorption-panel/',
    '/easy-acoustic-system/dq-combinatory-easeapps/',
    '/easy-acoustic-system/acoustic-baffle/',
    '/easy-acoustic-system/smartfuser/',
    '/easy-acoustic-system/smartbooth/',
    '/easy-acoustic-system/chessfuser/',
    '/easy-acoustic-system/quadrifuser/',
    '/easy-acoustic-system/octofuser/',
    '/easy-acoustic-system/metafuser/',
    '/easy-acoustic-system/fuseaser/',
    '/easy-acoustic-system/d80w-trapfuser/',
    '/easy-acoustic-system/trifuser/',
    '/easy-acoustic-system/d60w-trapfuser/',
    '/easy-acoustic-system/peak-5q-diffuser/',
    '/easy-acoustic-system/cloud-2c-diffuser/',
    '/easy-acoustic-system/arc-diffuser/',
    '/easy-acoustic-system/arc-basstrap/',
    '/easy-acoustic-system/wave-diffuser/',
    '/easy-acoustic-system/peak-diffuser/',
    '/easy-acoustic-system/mls-pyramid-diffuser/'
  ],
  'sound-insulation': [
    '/sound-insulation-damping-system/sound-insulation-board/',
    '/sound-insulation-damping-system/high-polymer-sound-insulation-felt/',
    '/sound-insulation-damping-system/damped-sound-insulation-felt/',
    '/sound-insulation-damping-system/vibration-absorber/',
    '/sound-insulation-damping-system/sound-insulation-damping-mat/',
    '/sound-insulation-damping-system/damped-sound-insulation-paint/',
    '/engineering-acoustic-system/acoustic-wool/'
  ],
  'acoustic-door': [
    '/acoustic-door/residence-acoustic-door/',
    '/acoustic-door/commercial-acoustic-door/',
    '/acoustic-door/engineering-acoustic-door/'
  ]
};

async function scrapeProduct(path, categorySlug) {
  const url = `https://www.soundboxacoustic.com${path}`;
  try {
    const html = await fetch(url);
    
    let title = "Unknown Product";
    const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i) || html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch) {
      title = titleMatch[1].replace(/&#[0-9]+;/g, '').replace(/<[^>]+>/g, '').trim();
      if (title.includes(" - SoundBox")) title = title.split(" - SoundBox")[0];
    }
    
    let description = "";
    const descMatch = html.match(/<meta[^>]*property=\"og:description\"[^>]*content=\"([^\"]+)\"/i) || 
                      html.match(/<meta[^>]*name=\"description\"[^>]*content=\"([^\"]+)\"/i);
    if (descMatch) description = descMatch[1];

    let img = "";
    const imgMatch = html.match(/<meta[^>]*property=\"og:image\"[^>]*content=\"([^\"]+)\"/i);
    if (imgMatch) img = imgMatch[1];

    if (!img) {
      const firstImg = html.match(/<img[^>]+src=\"(https:\/\/www\.soundboxacoustic\.com\/wp-content\/uploads\/[^\"]+)\"/i);
      if (firstImg) img = firstImg[1];
    }
    
    let slug = path.split('/').filter(Boolean).pop();

    return {
      title,
      url,
      slug,
      categorySlug,
      img,
      description,
      docs: [],
      gallery: img ? [img] : [],
      sections: {
        "technical-specification": ""
      }
    };
  } catch(e) {
    console.error("Failed", url);
    return null;
  }
}

async function run() {
  const allProducts = [];
  for (const [cat, paths] of Object.entries(categories)) {
     for (const p of paths) {
       const prod = await scrapeProduct(p, cat);
       if (prod && prod.img) {
         allProducts.push(prod);
         console.log(`Scraped: ${prod.title} (${cat})`);
       }
     }
  }

  fs.writeFileSync('./src/data/soundbox_exact.json', JSON.stringify(allProducts, null, 2));
  console.log(`Done gathering ${allProducts.length} items.`);
}

run();
