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

const targets = [
  {
    categorySlug: 'absorbers',
    url: 'https://www.soundboxacoustic.com/easy-acoustic-system/',
    links: []
  },
  {
    categorySlug: 'sound-insulation',
    url: 'https://www.soundboxacoustic.com/sound-insulation-damping-system/',
    links: []
  },
  {
    categorySlug: 'acoustic-door',
    url: 'https://www.soundboxacoustic.com/acoustic-door/',
    links: []
  }
];

async function scrapeCategory(target) {
  try {
    const html = await fetch(target.url);
    const regex = /href=[\"'](https:\/\/www\.soundboxacoustic\.com\/[^\/]+\/[^\/]+\/)[\"']/gi;
    let match;
    const urls = [];
    while ((match = regex.exec(html)) !== null) {
      if (!match[1].includes('category')) {
         urls.push(match[1]);
      }
    }
    target.links = [...new Set(urls)];
    console.log(`Found ${target.links.length} links for ${target.categorySlug}`);
  } catch(e) {
    console.error(e);
  }
}

async function scrapeProduct(url, categorySlug) {
  try {
    const html = await fetch(url);
    
    const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i) || html.match(/<title>(.*?)<\/title>/i);
    let title = titleMatch ? titleMatch[1].replace(/&#[0-9]+;/g, '').replace(/<[^>]+>/g, '').trim() : "Unknown Product";
    if (title.includes(" - SoundBox")) title = title.split(" - SoundBox")[0];
    
    const descMatch = html.match(/<meta[^>]*property=\"og:description\"[^>]*content=\"([^\"]+)\"/i) || 
                      html.match(/<meta[^>]*name=\"description\"[^>]*content=\"([^\"]+)\"/i);
    let description = descMatch ? descMatch[1] : "";

    const imgMatch = html.match(/<meta[^>]*property=\"og:image\"[^>]*content=\"([^\"]+)\"/i);
    let img = imgMatch ? imgMatch[1] : "";

    if (!img) {
      const firstImg = html.match(/<img[^>]+src=\"(https:\/\/www\.soundboxacoustic\.com\/wp-content\/uploads\/[^\"]+)\"/i);
      if (firstImg) img = firstImg[1];
    }
    
    // To prevent scraping weird non-product pages, check if we found a decent title/image
    if (!title) return null;

    let slug = url.split('/').filter(Boolean).pop();

    return {
      title,
      url,
      slug: slug,
      categorySlug: categorySlug,
      img,
      description,
      docs: [],
      gallery: [img].filter(Boolean),
      sections: {
        "technical-specification": ""
      }
    };
  } catch(e) {
    return null;
  }
}

async function run() {
  for (const target of targets) {
    await scrapeCategory(target);
  }

  const allProducts = [];
  for (const target of targets) {
    for (const link of target.links) {
       // Avoid root domain and category pages
       if (link === 'https://www.soundboxacoustic.com/' || link.includes('wp-content')) continue;
       
       const p = await scrapeProduct(link, target.categorySlug);
       if (p && p.img) {
         // Filter out navigation/menu links that we accidentally parsed
         if (p.url.includes(target.url) || p.url.includes('soundboxacoustic.com')) {
           allProducts.push(p);
           console.log(`Scraped: ${p.title} (${p.categorySlug})`);
         }
       }
    }
  }

  fs.writeFileSync('./src/data/soundbox_latest_scraped.json', JSON.stringify(allProducts, null, 2));
  console.log('Saved ' + allProducts.length + ' total products.');
}

run();
