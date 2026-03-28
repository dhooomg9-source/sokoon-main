const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith('.jsx')) {
      callback(filepath);
    }
  });
}

walk(srcDir, (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // Replacements
  content = content.replace(/bg-background/g, 'bg-body');
  content = content.replace(/bg-paper/g, 'bg-card');
  content = content.replace(/text-paper/g, 'text-on-dark');
  content = content.replace(/border-borderLight/g, 'border-subtle');
  content = content.replace(/selection:text-paper/g, 'selection:text-card');
  content = content.replace(/text-dark/g, 'text-primary'); // primary and copy are both #0A1128, so mapping to primary is safe
  content = content.replace(/border-dark/g, 'border-primary');

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log('Updated:', filepath);
  }
});

console.log('Done refactoring color classes.');
