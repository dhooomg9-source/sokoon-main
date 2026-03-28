const fs = require('fs');
const catalogPath = './src/data/abstracta_catalog.json';
const scrapedPath = './src/data/soundbox_exact.json';

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const newProducts = JSON.parse(fs.readFileSync(scrapedPath, 'utf8'));

// 1. Rename 'Suspended Absorbers' to 'Absorbers'
const suspendedCat = catalog.categories.find(c => c.slug === 'suspended-absorbers');
if (suspendedCat) {
  suspendedCat.title = 'Absorbers';
  // Keep the slug as suspended-absorbers to not break existing links
}

// 2. Add new categories if they don't exist
const newCategories = [
  {
    title: "Sound Insulation",
    slug: "sound-insulation",
    img: "https://www.soundboxacoustic.com/wp-content/uploads/2019/08/sound-insulation-board.png"
  },
  {
    title: "Acoustic Door",
    slug: "acoustic-door",
    img: "https://www.soundboxacoustic.com/wp-content/uploads/2019/08/residence-acoustic-door.png"
  }
];

for (const nc of newCategories) {
  if (!catalog.categories.find(c => c.slug === nc.slug)) {
    catalog.categories.push(nc);
  }
}

// 3. Add products
let addedCount = 0;
for (const prod of newProducts) {
  // If the product is in 'absorbers', we should map it to the slug 'suspended-absorbers'
  if (prod.categorySlug === 'absorbers') {
    prod.categorySlug = 'suspended-absorbers';
  }

  const alreadyExists = catalog.products.some(p => p.slug === prod.slug && p.categorySlug === prod.categorySlug);
  if (!alreadyExists) {
    catalog.products.push(prod);
    addedCount++;
  }
}

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
console.log(`Successfully merged ${addedCount} products and 2 new categories.`);
