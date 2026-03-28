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

  // Replacements for missed edge cases
  content = content.replace(/border-paper/g, 'border-card');
  content = content.replace(/from-background/g, 'from-body');
  content = content.replace(/via-background/g, 'via-body');
  content = content.replace(/to-background/g, 'to-body');

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log('Updated edge cases in:', filepath);
  }
});

console.log('Done refactoring edge cases.');
