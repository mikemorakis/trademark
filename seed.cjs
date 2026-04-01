const fs = require('fs');
const path = require('path');

const blogDir = 'src/content/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

let sql = '';
for (const file of files) {
  const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) continue;

  const fm = fmMatch[1];
  const body = fmMatch[2].trim();

  const get = (key) => {
    const m = fm.match(new RegExp(`^${key}:\\s*"?(.*?)"?$`, 'm'));
    return m ? m[1] : '';
  };

  const title = get('title').replace(/'/g, "''");
  const slug = get('slug').replace(/'/g, "''");
  const date = get('date');
  const author = get('author') || 'Giannis Psarakis';
  const content = body.replace(/'/g, "''");

  sql += `INSERT OR IGNORE INTO posts (title, slug, content, author, date, published) VALUES ('${title}', '${slug}', '${content}', '${author}', '${date}', 1);\n`;
}

fs.writeFileSync('seed.sql', sql, 'utf-8');
console.log(`Generated seed.sql with ${files.length} posts`);
