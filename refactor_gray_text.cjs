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

  // Replacements to fix Tailwind opacity text bug with CSS variables
  content = content.replace(/text-primary\/70/g, 'text-slate-600');
  content = content.replace(/text-primary\/80/g, 'text-slate-700');
  content = content.replace(/text-on-dark\/50/g, 'text-slate-400');
  content = content.replace(/text-on-dark\/60/g, 'text-slate-300');
  content = content.replace(/text-on-dark\/70/g, 'text-slate-300');
  content = content.replace(/text-muted/g, 'text-slate-500');

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log('Updated opacity classes in:', filepath);
  }
});

console.log('Done fixing legibility text classes.');
