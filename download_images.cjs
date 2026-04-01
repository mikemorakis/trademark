const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const urls = fs.readFileSync('image_urls.txt', 'utf-8').trim().split('\n');
const imgDir = 'public/images/blog';
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const urlMap = {};
let count = 0;

for (const url of urls) {
  const hash = crypto.createHash('md5').update(url).digest('hex').substring(0, 10);
  const ext = url.match(/\.(jpg|jpeg|png|gif|webp|svg)/i)?.[1] || 'jpg';
  const filename = `img-${hash}.${ext}`;
  const localPath = path.join(imgDir, filename);

  try {
    if (!fs.existsSync(localPath)) {
      execSync(`curl -sL "${url}" -o "${localPath}"`, { timeout: 15000 });
    }
    const size = fs.statSync(localPath).size;
    if (size > 100) {
      urlMap[url] = `/images/blog/${filename}`;
      count++;
      console.log(`OK: ${filename} (${size} bytes)`);
    } else {
      console.log(`SKIP: ${filename} - too small`);
      fs.unlinkSync(localPath);
    }
  } catch(e) {
    console.log(`FAIL: ${url.substring(0, 60)}... - ${e.message}`);
  }
}

// Generate SQL to replace URLs in content
let sql = '';
for (const [oldUrl, newUrl] of Object.entries(urlMap)) {
  const escaped = oldUrl.replace(/'/g, "''");
  sql += `UPDATE posts SET content = REPLACE(content, '${escaped}', '${newUrl}') WHERE content LIKE '%${escaped.substring(0, 60)}%';\n`;
}

fs.writeFileSync('fix_images.sql', sql, 'utf-8');
fs.writeFileSync('url_map.json', JSON.stringify(urlMap, null, 2), 'utf-8');
console.log(`\nDownloaded ${count} images. Generated fix_images.sql`);
