const fs = require('fs');
const path = require('path');

const dir = 'extracted';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let sql = '';
let count = 0;

for (const file of files) {
  const slug = file.replace('.html', '');
  const html = fs.readFileSync(path.join(dir, file), 'utf-8');

  const start = html.indexOf("id='post-body'");
  if (start === -1) continue;

  const endMarker = html.indexOf('post-footer', start);
  const end = endMarker > 0 ? endMarker : start + 30000;
  let body = html.substring(start, end);

  // Remove the id='post-body'> prefix
  body = body.replace(/^id='post-body'[^>]*>/, '');

  // Remove script tags
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Remove style attributes but keep tags
  body = body.replace(/ style="[^"]*"/gi, '');
  body = body.replace(/ class="[^"]*"/gi, '');
  body = body.replace(/ id="[^"]*"/gi, '');
  body = body.replace(/ data-[^=]*="[^"]*"/gi, '');

  // Remove div/span wrappers but keep content
  body = body.replace(/<\/?div[^>]*>/gi, '');
  body = body.replace(/<\/?span[^>]*>/gi, '');

  // Keep: a, p, h1-h6, ul, ol, li, strong, b, em, i, br, img, blockquote, table, tr, td, th
  // Remove everything else
  body = body.replace(/<\/?(?!a |a>|\/a>|p |p>|\/p>|h[1-6]|\/h[1-6]|ul|\/ul|ol|\/ol|li|\/li|strong|\/strong|b>|\/b>|em|\/em|i>|\/i>|br|img |blockquote|\/blockquote|table|\/table|tr|\/tr|td|\/td|th|\/th)[a-z][^>]*>/gi, '');

  // Clean up entities
  body = body.replace(/&nbsp;/g, ' ');
  body = body.replace(/&#171;/g, '«');
  body = body.replace(/&#187;/g, '»');
  body = body.replace(/&#8220;/g, '\u201C');
  body = body.replace(/&#8221;/g, '\u201D');
  body = body.replace(/&#8211;/g, '\u2013');
  body = body.replace(/&#8212;/g, '\u2014');
  body = body.replace(/&#729;/g, '\u00B7');

  // Remove sidebar/footer content
  const sidebarIdx = body.indexOf('Popular Posts');
  if (sidebarIdx > 0) body = body.substring(0, sidebarIdx);
  const catIdx = body.indexOf('Categories');
  if (catIdx > 0 && catIdx > body.length - 500) body = body.substring(0, catIdx);

  // Clean whitespace
  body = body.replace(/\n\s*\n\s*\n/g, '\n\n');
  body = body.trim();

  // Map slug to DB slug
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

  const dbSlug = slugMap[slug] || slug;
  const escaped = body.replace(/'/g, "''");
  sql += `UPDATE posts SET content = '${escaped}' WHERE slug = '${dbSlug}';\n`;
  count++;
  console.log(`${slug} -> ${dbSlug}: ${body.length} chars`);
}

fs.writeFileSync('fix_content.sql', sql, 'utf-8');
console.log(`\nGenerated fix_content.sql with ${count} updates`);
