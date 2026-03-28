import fs from 'fs';
import * as cheerio from 'cheerio';

function extractAcoustieg() {
    console.log("=== ACOUSTIEG CONSULTING ===");
    const $ = cheerio.load(fs.readFileSync('acoustieg_consulting.html', 'utf8'));
    // Usually the main content is in an article or container
    const items = [];
    $('.elementor-widget-container h3, .elementor-widget-container p').each((i, el) => {
        let text = $(el).text().replace(/\s+/g, ' ').trim();
        if (text.length > 10) items.push(text);
    });
    console.log(items.slice(0, 30).join('\n'));
}

function extractResonicsServices() {
    console.log("\n=== RESONICS PROMISE & SERVICES ===");
    const $ = cheerio.load(fs.readFileSync('resonics_services.html', 'utf8'));
    $('h2:contains("Our service promise"), h2:contains("From start to finish")').parent().parent().find('h3, p').each((i, el) => {
        console.log($(el).text().replace(/\s+/g, ' ').trim());
    });
    // Let's get all h2, h3 and p to see what's there if the above fails
    console.log("\n--- fallback h2/h3 ---");
    $('h2, h3').each((i, el) => {
        console.log($(el).text().trim());
    });
}

extractAcoustieg();
extractResonicsServices();
