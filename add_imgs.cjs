const fs = require('fs');
const map = JSON.parse(fs.readFileSync('image_map.json', 'utf-8'));

for (const [astroFile, urls] of Object.entries(map.postImgs)) {
  if (!urls.length) continue;
  const astro = fs.readFileSync(astroFile, 'utf-8');
  
  // Find first local path for this post's first image
  const localPaths = urls.map(url => {
    const img = map.imgList.find(i => i.url === url);
    return img ? img.local : null;
  }).filter(Boolean).filter(p => !p.includes('img-32') && !p.includes('img-33'));
  
  if (!localPaths.length) continue;
  
  // Add first image right after the opening > of PostLayout
  const insertPoint = astro.indexOf('\n>', astro.indexOf('<PostLayout'));
  if (insertPoint === -1) continue;
  
  const imgTag = '\n  <img src="' + localPaths[0] + '" alt="" />\n';
  
  // Check if there's already an img tag
  if (astro.includes('<img src="' + localPaths[0])) continue;
  
  const newAstro = astro.substring(0, insertPoint + 2) + imgTag + astro.substring(insertPoint + 2);
  fs.writeFileSync(astroFile, newAstro, 'utf-8');
  console.log('IMG ' + astroFile.split('/').pop() + ' -> ' + localPaths[0]);
}
