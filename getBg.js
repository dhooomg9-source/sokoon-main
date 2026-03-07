/* global require */
const https = require('https');

https.get('https://devonlinetestserver.com/sokoon/', res => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const matches = data.match(/background-color:\s*(#[0-9a-fA-F]{3,6})/gi) || 
                    data.match(/background:\s*(#[0-9a-fA-F]{3,6})/gi) ||
                    data.match(/rgba?\([^)]+\)/gi);
    
    // Also try to find a linked CSS file and fetch it
    const cssLink = data.match(/href=["'](.*?post-\d+\.css.*?)["']/i);
    if (cssLink && cssLink[1]) {
      const url = cssLink[1].startsWith('//') ? 'https:' + cssLink[1] : cssLink[1];
      console.log('Fetching CSS:', url);
      https.get(url, r2 => {
        let cssData = '';
        r2.on('data', d => cssData += d);
        r2.on('end', () => {
          const m = cssData.match(/background-color:\s*(#[0-9a-fA-F]{3,6})/gi);
          console.log('CSS Matches:', m ? [...new Set(m)] : 'None');
        });
      });
    } else {
      console.log('Inline Matches:', matches ? [...new Set(matches)] : 'None');
    }
  });
});
