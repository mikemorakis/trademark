const fs = require('fs');
const path = require('path');

const dir = 'extracted';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const slugMap = {
  'emporikosimaseminario': 'emporikosimaseminario',
  'adwords-google-trademark': 'adwords-google-trademark',
  'european-ip-review': 'european-intellectual-property-review',
  'kluwer-trademark': 'kluwer-trademark-blog-wolters-kluwer-nv',
  'journal-ip-law': 'journal-of-intellectual-property-law',
  'blog-post': 'blog-post',
  'dikaio-simatwn': 'dikaio-simatwn',
  'turkaegean': 'emporiko-sima-onoma-turkaegean-euipo-katoxurosi',
  'domain-name': 'katoxurwsi-domain-name-kai-emporiko-sima',
  'katoxirosi-dhlwsh': 'katoxirosi-simatos-dhlwsh',
  'juventus': 'trademark-simata-dikigoros-juv',
  'netflix': 'trademark-netflix-euipo',
  'russia-polemos': 'russia-polemos-trademark',
  'patentes-polemos': 'emporiko-sima-patentes-polemos',
  'branding-marketing': 'branding-marketing',
  'sima-ee': 'sima-tis-europaikis-enwsis',
  'sima-kataxwrish': 'emporiko-sima-kataxwrish',
  'sima-eidikos': 'emporiko-sima-eidikos',
  'sima-dikigoroi': 'emporiko-sima-dikigoroi',
  'milan-ac': 'emporiko-sima-EE-EUIPO',
  'kataxorisi-elegxos': 'kataxorisi-simatos-elegxos',
  'kataxwrisi-onoma': 'kataxwrisi-onoma-katoxurosi-sima-logo',
  'sima-perioussiako': 'emporiko-sima-dikigoros-kataxorisi-katoxurosi',
  'prosvoli-part2': 'sima-dikigoros-prosvoli-katoxurosi',
  'paraviasi': 'paraviasi-sima-dikigoros-prostasia',
  'la-liga': 'kataxwrisi-sima-euipo',
  'prostasia-fimi': 'prostasia-sima-trademark',
  'onoma-simata': 'onoma-simata-kataxorisi-dikigoros',
  'obi-simata': 'OBI-SIMATA-EUIPO',
  'prosvoli-simatos': 'prosvoli-emporikou-simatos',
  'euipo-obi-elegxos': 'EUIPO-OBI-SIMA-ELEGXOS-DIKIGOROS',
  'sima-epwnumia': 'sima-epwnumia-domain-kataxwrisi',
};

const allTags = new Set();
const postTags = {};

for (const file of files) {
  const slug = file.replace('.html', '');
  const dbSlug = slugMap[slug] || slug;
  const html = fs.readFileSync(path.join(dir, file), 'utf-8');

  // Find label links - Blogger uses <a class='label-name' href='.../label/TAG'>
  const tagMatches = html.matchAll(/label-name[^>]*>([^<]+)</g);
  const tags = [];
  for (const m of tagMatches) {
    const tag = m[1].trim();
    if (tag && tag.length > 1 && !tag.startsWith('http')) {
      allTags.add(tag);
      tags.push(tag);
    }
  }

  // Also try another pattern: /search/label/TAG
  const labelMatches = html.matchAll(/\/search\/label\/([^"']+)/g);
  for (const m of labelMatches) {
    const tag = decodeURIComponent(m[1]).trim();
    if (tag && tag.length > 1) {
      allTags.add(tag);
      if (!tags.includes(tag)) tags.push(tag);
    }
  }

  if (tags.length > 0) {
    postTags[dbSlug] = [...new Set(tags)];
  }
}

// Generate SQL
let sql = '';

// Insert unique tags
const tagList = [...allTags].sort();
for (const tag of tagList) {
  sql += `INSERT OR IGNORE INTO tags (name) VALUES ('${tag.replace(/'/g, "''")}');\n`;
}

// Insert post-tag relationships
for (const [slug, tags] of Object.entries(postTags)) {
  for (const tag of tags) {
    sql += `INSERT OR IGNORE INTO post_tags (post_id, tag_id) SELECT p.id, t.id FROM posts p, tags t WHERE p.slug = '${slug}' AND t.name = '${tag.replace(/'/g, "''")}';\n`;
  }
}

fs.writeFileSync('import_tags.sql', sql, 'utf-8');
console.log(`Tags found: ${tagList.length}`);
console.log(tagList.join(', '));
console.log(`\nPosts with tags: ${Object.keys(postTags).length}`);
for (const [slug, tags] of Object.entries(postTags)) {
  console.log(`  ${slug}: ${tags.length} tags`);
}
