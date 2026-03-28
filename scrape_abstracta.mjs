import fs from 'fs';
import * as cheerio from 'cheerio';
import https from 'https';

const BASE_URL = 'https://abstracta.se';
const START_URL = 'https://abstracta.se/products/';

// Simple fetch wrapper since node fetch might be tricky depending on version
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function removeAbstracta(text) {
  if (!text) return '';
  return text.replace(/Abstracta/gi, '').trim();
}

async function scrape() {
  console.log('Starting deep scrape of abstracta.se/products/ ...');
  const mainHtml = await fetchHTML(START_URL);
  const $ = cheerio.load(mainHtml);

  // Scrape Categories
  // Looking at the grid on start url, the categories are listed under "Product Categories"
  // Each category is an article or linked image card.
  // We can find them typically under .products-grid or similar.
  // The user screenshot showed: Trending Products, Silent Pods, Acoustic Wall Panels, etc.
  
  // Wait, let's look for links that contain "/product-category/"
  const categoryLinks = [];
  $('a[href*="/product-category/"]').each((i, el) => {
    const url = $(el).attr('href');
    const titleRaw = $(el).find('h3, .title, span').text().trim() || $(el).text().trim();
    const title = removeAbstracta(titleRaw);
    
      // We only want the unique primary categories
    if (url && title && !categoryLinks.find(c => c.url === url) && title.length > 2) {
      // Find the image within this link, if any
      const img = $(el).find('img').attr('src') || $(el).find('img').attr('data-src') || '';
      
      categoryLinks.push({
        title,
        url,
        slug: url.split('/').filter(Boolean).pop(),
        img: img.replace(/&amp;/g, '&')
      });
    }
  });

  // Filter out duplicates and non-visual links (like footer links)
  // Categories from screenshot: Trending Products, Silent Pods, Acoustic Wall Panels, Acoustic Lighting, Acoustic Furniture, Floor Screens, Desk Screens, Acoustic Wall Art, Suspended Absorbers, Cubicles, Ceiling Baffles & Ceiling Panels, Products With Writing Boards
  const validSlugs = ['trending-products', 'silent-pods', 'acoustic-wall-panels', 'acoustic-lighting', 'acoustic-furniture', 'floor-screens', 'desk-screens', 'acoustic-wall-art', 'suspended-absorbers', 'cubicles', 'ceiling-baffles-ceiling-panels', 'writing-boards'];
  
  const finalCategories = categoryLinks.filter(c => validSlugs.includes(c.slug));

  console.log(`Found ${finalCategories.length} categories.`);

  const db = { categories: [], products: [] };

  // For each category, scrape the list of products
  for (const cat of finalCategories) {
    console.log(`Scraping category: ${cat.title} (${cat.url})`);
    try {
      const catHtml = await fetchHTML(cat.url);
      const $cat = cheerio.load(catHtml);

      // We need to find the product cards inside this category.
      // Usually they are standard product cards
      const categoryProducts = [];

      $cat('a[href*="/product/"]').each((i, el) => {
        const pUrl = $cat(el).attr('href');
        // Filter out category links or non product links
        if(pUrl.includes('/product-category/') || pUrl === 'https://abstracta.se/products/') return;

        const pTitleRaw = $cat(el).find('.title, h3, h2').text().trim() || $cat(el).text().trim();
        const pTitle = removeAbstracta(pTitleRaw);
        
        // Exclude empty titles or duplicate URLs
        if(pTitle && !categoryProducts.find(p => p.url === pUrl) && pTitle.length > 2) {
          const pImg = $cat(el).find('img').attr('src') || $cat(el).find('img').attr('data-src') || '';
          
          categoryProducts.push({
            title: pTitle,
            url: pUrl,
            slug: pUrl.split('/').filter(Boolean).pop(),
            categorySlug: cat.slug,
            img: pImg.replace(/&amp;/g, '&')
          });
        }
      });

      // Avoid massive duplicates across categories if any, but we link them by categorySlug
      for (const prod of categoryProducts) {
        if(!db.products.find(p => p.url === prod.url)) {
          db.products.push(prod);
        }
      }
      
      db.categories.push({
        title: cat.title,
        slug: cat.slug,
        img: cat.img || (categoryProducts[0] ? categoryProducts[0].img : '') // fallback image
      });
      
    } catch (e) {
      console.error(`Error scraping category ${cat.url}:`, e.message);
    }
  }

  // Now, scrape deep product details (Documentation)
  console.log(`Scraping deep details for ${db.products.length} products... This may take a minute.`);
  for (const prod of db.products) {
    try {
      const prodHtml = await fetchHTML(prod.url);
      const $prod = cheerio.load(prodHtml);

      // Scrape documentation files (pdfs, dwg, etc) usually under a "Downloads" or "Documentation" section
      const docs = [];
      $prod('a[href$=".pdf"]').each((i, el) => {
        const dUrl = $prod(el).attr('href');
        const dTitleRaw = $prod(el).text().trim() || 'Document';
        const dTitle = removeAbstracta(dTitleRaw);
        if(dUrl && !docs.find(d => d.url === dUrl) && dTitle) {
          docs.push({ title: dTitle, url: dUrl });
        }
      });

      // Extract high res images (galleries)
      const gallery = [];
      $prod('img').each((i, el) => {
        const src = $prod(el).attr('src') || $prod(el).attr('data-src');
        if(src && src.includes('imgix.net') && !gallery.includes(src)) {
          gallery.push(src.replace(/&amp;/g, '&'));
        }
      });

      // Extract description
      const desc = removeAbstracta($prod('article p').first().text().trim() || $prod('.description, .content p').first().text().trim());

      prod.docs = docs;
      prod.gallery = gallery.slice(0, 5); // Max 5 gallery images
      prod.description = desc;

      process.stdout.write('.'); // progress indicator

    } catch (e) {
      console.error(`Error deep scraping product ${prod.url}:`, e.message);
    }
  }

  console.log('\nDeep scrape finished!');
  fs.mkdirSync('./src/data', { recursive: true });
  fs.writeFileSync('./src/data/abstracta_catalog.json', JSON.stringify(db, null, 2));
  console.log('Saved data to src/data/abstracta_catalog.json');
}

scrape();
