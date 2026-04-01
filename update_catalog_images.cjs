const fs = require('fs');

const path = './src/data/abstracta_catalog.json';
const catalog = JSON.parse(fs.readFileSync(path, 'utf-8'));

let updated = 0;
catalog.products = catalog.products.map(prod => {
  if (prod.categorySlug === 'sound-insulation') {
    prod.img = '/generated/sound_insulation.png';
    prod.gallery = ['/generated/sound_insulation.png'];
    updated++;
  } else if (prod.categorySlug === 'acoustic-door') {
    prod.img = '/generated/acoustic_door.png';
    prod.gallery = ['/generated/acoustic_door.png'];
    updated++;
  }
  return prod;
});

catalog.categories = catalog.categories.map(cat => {
  if (cat.slug === 'sound-insulation') {
    cat.img = '/generated/sound_insulation.png';
    updated++;
  } else if (cat.slug === 'acoustic-door') {
    cat.img = '/generated/acoustic_door.png';
    updated++;
  }
  return cat;
});

fs.writeFileSync(path, JSON.stringify(catalog, null, 2));
console.log(`Updated ${updated} items in the catalog.`);
