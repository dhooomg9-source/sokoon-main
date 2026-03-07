const https = require('https');

https.get('https://devonlinetestserver.com/sokoon/', res => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const cssLink = data.match(/href=["'](.*?post-\d+\.css.*?)["']/i);
    if (cssLink && cssLink[1]) {
      const url = cssLink[1].startsWith('//') ? 'https:' + cssLink[1] : cssLink[1];
      console.log('Fetching CSS:', url);
      https.get(url, r2 => {
        let cssData = '';
        r2.on('data', d => cssData += d);
        r2.on('end', () => {
          const m = cssData.match(/background-color:\s*(#[0-9a-fA-F]{3,6})/gi);
          console.log('CSS Matches:', m ? [...new Set(m)].slice(0, 5) : 'None');
        });
      });
    } else {
      console.log('No Elementor CSS found. Inline logic:');
      const matches = data.match(/#[0-9a-fA-F]{3,6}/gi);
      console.log([...new Set(matches)].slice(0, 10));
    }
  });
});
