const fs = require('fs');
const catalogPath = './src/data/abstracta_catalog.json';
const soundboxPath = './src/data/soundbox_scraped.json';

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const soundboxProducts = JSON.parse(fs.readFileSync(soundboxPath, 'utf8'));

// 1. Identify missing Abstracta products that are currently in 'trending-products'
const abstractaSlugsToDuplicate = [
  'abstracta-x-verk', 
  'abstracta-wall-of-art-acoustic-art-panels', 
  'sahara-wall-panel-cork', 
  'scala-wall-sound-absorbing-panels', 
  'scala-xl', 
  'vika-wall-light', 
  'bits-wall-2'
];

let addedCount = 0;

for (const slug of abstractaSlugsToDuplicate) {
  // Find the product
  const prod = catalog.products.find(p => p.url.includes(slug) && p.categorySlug !== 'acoustic-wall-panels');
  if (prod) {
    // Check if it's already duplicated
    const alreadyExists = catalog.products.some(p => p.url.includes(slug) && p.categorySlug === 'acoustic-wall-panels');
    if (!alreadyExists) {
      const pCopy = JSON.parse(JSON.stringify(prod));
      pCopy.categorySlug = 'acoustic-wall-panels';
      catalog.products.push(pCopy);
      addedCount++;
    }
  }
}

// 2. Add Soundbox Acoustic products
for (const sbProd of soundboxProducts) {
  const alreadyExists = catalog.products.some(p => p.slug === sbProd.slug && p.categorySlug === 'acoustic-wall-panels');
  if (!alreadyExists) {
    catalog.products.push(sbProd);
    addedCount++;
  }
}

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
console.log(`Successfully added ${addedCount} products to the acoustic-wall-panels category.`);
