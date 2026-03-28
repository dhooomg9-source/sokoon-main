import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function fetchURL(url, selector, outputFile) {
    try {
        console.log(`Fetching from ${url} ...`);
        const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(data);
        const content = $(selector).html() || $(selector).text();
        fs.writeFileSync(outputFile, content || 'NO CONTENT FOUND', 'utf8');
        console.log(`Saved to ${outputFile}`);
    } catch (e) {
        console.error(`Failed ${url}: ${e.message}`);
    }
}

async function run() {
    // We fetch the entire body or main sections to analyze manually afterwards, 
    // or just dump the whole text and use the LLM to process it during the next step.
    await fetchURL('https://resonics.co.uk/acoustic-services/', 'body', 'resonics_services.html');
    await fetchURL('https://acoustieg.com/consulting-services/', 'body', 'acoustieg_consulting.html');
    await fetchURL('https://resonics.co.uk/services/acoustic-survey/', 'body', 'resonics_survey.html');
    await fetchURL('https://resonics.co.uk/product-category/acoustic-panels/', 'body', 'resonics_panels.html');
    await fetchURL('https://resonics.co.uk/services/sound-masking/', 'body', 'resonics_masking.html');
}

run();
