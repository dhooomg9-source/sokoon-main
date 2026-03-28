import axios from 'axios';
import * as cheerio from 'cheerio';

async function scrape() {
  try {
    const { data } = await axios.get('https://abstracta.se/product/plenty-pod-quiet-room/');
    const $ = cheerio.load(data);
    
    const sections = [
      'about',
      'inspiration',
      'designer',
      'technical-specification',
      'documentation',
      'materials-and-colours',
      'downloads',
      'projects'
    ];

    sections.forEach(secId => {
      const el = $(`#${secId}`);
      if (el.length > 0) {
        console.log(`Found section: ${secId}`);
        // let's grab the text content but limit length to see if we got it right
        let textContent = el.text().replace(/\s+/g, ' ').trim();
        console.log(`Content snippet: ${textContent.substring(0, 100)}...`);
        
        // Also extract any images inside
        const imgs = [];
        el.find('img').each((i, img) => {
           let src = $(img).attr('data-src') || $(img).attr('src');
           if (src && src.startsWith('http')) imgs.push(src);
        });
        console.log(`Found images: ${imgs.length}`);
      }
    });

  } catch (err) {
    console.error(err);
  }
}

scrape();
