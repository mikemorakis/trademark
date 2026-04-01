const fs = require('fs');

const html = fs.readFileSync('extracted/juventus.html', 'utf-8');
const footerIdx = html.indexOf('post-footer');
if (footerIdx > 0) {
  const chunk = html.substring(footerIdx, footerIdx + 2000);
  const labels = chunk.matchAll(/label\/([^'"&]+)/g);
  const tags = new Set();
  for (const l of labels) tags.add(decodeURIComponent(l[1]));
  console.log('Juventus tags:', [...tags]);
}

// Check another post
const html2 = fs.readFileSync('extracted/netflix.html', 'utf-8');
const fi2 = html2.indexOf('post-footer');
if (fi2 > 0) {
  const chunk = html2.substring(fi2, fi2 + 2000);
  const labels = chunk.matchAll(/label\/([^'"&]+)/g);
  const tags = new Set();
  for (const l of labels) tags.add(decodeURIComponent(l[1]));
  console.log('Netflix tags:', [...tags]);
}

const html3 = fs.readFileSync('extracted/domain-name.html', 'utf-8');
const fi3 = html3.indexOf('post-footer');
if (fi3 > 0) {
  const chunk = html3.substring(fi3, fi3 + 2000);
  const labels = chunk.matchAll(/label\/([^'"&]+)/g);
  const tags = new Set();
  for (const l of labels) tags.add(decodeURIComponent(l[1]));
  console.log('Domain tags:', [...tags]);
}
