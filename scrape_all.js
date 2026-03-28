import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

const JSON_FILE = 'src/data/abstracta_catalog.json';

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeAll() {
  try {
    const data = fs.readFileSync(JSON_FILE, 'utf8');
    const catalog = JSON.parse(data);
    
    const sectionsToScrape = [
      'inspiration',
      'technical-specification',
      'documentation',
      'materials-and-colours',
      'downloads',
      'projects'
    ];
    
    for (let product of catalog.products) {
      if (!product.url) continue;
      
      console.log(`Scraping: ${product.title} - ${product.url}`);
      try {
          const { data: html } = await axios.get(product.url);
          const $ = cheerio.load(html);
          
          product.sections = {};
          
          // Extract specific sections as HTML
          sectionsToScrape.forEach(secId => {
            const el = $(`#${secId}`);
            if (el.length > 0) {
              // we will remove scripts just in case
              el.find('script').remove();
              
              // For images, we should ensure src is absolute, or we just extract the images to a gallery
              let htmlContent = el.html();
              if (htmlContent) {
                  product.sections[secId] = htmlContent;
              }
            }
          });
          
          // Extract gallery pictures (e.g. from inspiration section or sliders)
          const newGalleryImages = new Set(product.gallery || []);
          
          // Look for images in inspiration section
          $('#inspiration img').each((i, img) => {
              let src = $(img).attr('data-src') || $(img).attr('src');
              if (src && src.startsWith('http') && !src.includes('svg')) {
                  // clean up query params to get higher res maybe
                  newGalleryImages.add(src.replace(/&amp;/g, '&'));
              }
          });
          
          // Look for main product images in the page
          $('.hero__media img, .detailCard__media img').each((i, img) => {
              let src = $(img).attr('data-src') || $(img).attr('src');
              if (src && src.startsWith('http') && !src.includes('svg')) {
                  newGalleryImages.add(src.replace(/&amp;/g, '&'));
              }
          });
          
          product.gallery = Array.from(newGalleryImages);
          
          // also fix empty descriptions
          const aboutEl = $('#about');
          if (aboutEl.length > 0) {
              const text = aboutEl.text().replace(/\s+/g, ' ').trim();
              if (text && text.length > 10) {
                  product.description = text;
              }
          }
          
      } catch (err) {
          console.error(`Failed to scrape ${product.url}: ${err.message}`);
      }
      
      // small delay to avoid rate limiting
      await delay(500);
    }
    
    fs.writeFileSync(JSON_FILE, JSON.stringify(catalog, null, 2));
    console.log('Finished updating catalog.');

  } catch (err) {
    console.error(err);
  }
}

scrapeAll();
