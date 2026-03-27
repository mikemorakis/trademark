const { execSync } = require('child_process');
const fs = require('fs');
const map = JSON.parse(fs.readFileSync('image_map.json', 'utf-8'));

let ok = 0, fail = 0;
for (const img of map.imgList) {
  if (img.url.startsWith('file://')) { console.log('SKIP ' + img.local + ' (local file)'); fail++; continue; }
  try {
    const url = img.url.replace(/&amp;/g, '&');
    execSync('curl -sL "' + url + '" -o "public' + img.local + '"', { timeout: 15000 });
    const stat = fs.statSync('public' + img.local);
    if (stat.size > 100) { ok++; } else { console.log('EMPTY ' + img.local); fail++; }
  } catch(e) { console.log('FAIL ' + img.local); fail++; }
}
console.log('Downloaded: ' + ok + ', Failed: ' + fail);
