const fs = require('fs');
const { execSync } = require('child_process');

const posts = [
  ['https://www.thetrademarkhoop.com/2024/05/emporikosimaseminario.html', 'emporikosimaseminario'],
  ['https://www.thetrademarkhoop.com/2024/02/adwords-google-trademark.html', 'adwords-google-trademark'],
  ['https://www.thetrademarkhoop.com/2024/01/european-intellectual-property-review.html', 'european-ip-review'],
  ['https://www.thetrademarkhoop.com/2024/01/kluwer-trademark-blog-wolters-kluwer-nv.html', 'kluwer-trademark'],
  ['https://www.thetrademarkhoop.com/2023/05/journal-of-intellectual-property-law.html', 'journal-ip-law'],
  ['https://www.thetrademarkhoop.com/2023/04/blog-post.html', 'blog-post'],
  ['https://www.thetrademarkhoop.com/2022/09/dikaio-simatwn.html', 'dikaio-simatwn'],
  ['https://www.thetrademarkhoop.com/2022/07/emporiko-sima-onoma-turkaegean-euipo-katoxurosi.html', 'turkaegean'],
  ['https://www.thetrademarkhoop.com/2022/06/katoxurwsi-domain-name-kai-emporiko-sima.html', 'domain-name'],
  ['https://www.thetrademarkhoop.com/2022/06/katoxirosi-simatos-dhlwsh.html', 'katoxirosi-dhlwsh'],
  ['https://www.thetrademarkhoop.com/2022/08/trademark-simata-dikigoros-juv.html', 'juventus'],
  ['https://www.thetrademarkhoop.com/2022/04/trademark-netflix-euipo.html', 'netflix'],
  ['https://www.thetrademarkhoop.com/2022/03/russia-polemos-trademark.html', 'russia-polemos'],
  ['https://www.thetrademarkhoop.com/2022/03/emporiko-sima-patentes-polemos.html', 'patentes-polemos'],
  ['https://www.thetrademarkhoop.com/2022/03/branding-marketing.html', 'branding-marketing'],
  ['https://www.thetrademarkhoop.com/2022/03/sima-tis-europaikis-enwsis.html', 'sima-ee'],
  ['https://www.thetrademarkhoop.com/2022/02/emporiko-sima-kataxwrish.html', 'sima-kataxwrish'],
  ['https://www.thetrademarkhoop.com/2022/02/emporiko-sima-eidikos.html', 'sima-eidikos'],
  ['https://www.thetrademarkhoop.com/2022/01/emporiko-sima-dikigoroi.html', 'sima-dikigoroi'],
  ['https://www.thetrademarkhoop.com/2022/01/emporiko-sima-EE-EUIPO.html', 'milan-ac'],
  ['https://www.thetrademarkhoop.com/2022/01/kataxorisi-simatos-elegxos.html', 'kataxorisi-elegxos'],
  ['https://www.thetrademarkhoop.com/2022/01/kataxwrisi-onoma-katoxurosi-sima-logo.html', 'kataxwrisi-onoma'],
  ['https://www.thetrademarkhoop.com/2021/12/katoxirosi-simatos-onomatos.html', 'katoxirosi-onomatos'],
  ['https://www.thetrademarkhoop.com/2021/11/emporiko-sima-dikigoros-kataxorisi-katoxurosi.html', 'sima-perioussiako'],
  ['https://www.thetrademarkhoop.com/2021/11/sima-dikigoros-prosvoli-katoxurosi.html', 'prosvoli-part2'],
  ['https://www.thetrademarkhoop.com/2021/11/paraviasi-sima-dikigoros-prostasia.html', 'paraviasi'],
  ['https://www.thetrademarkhoop.com/2021/11/kataxwrisi-sima-euipo.html', 'la-liga'],
  ['https://www.thetrademarkhoop.com/2021/11/prostasia-sima-trademark.html', 'prostasia-fimi'],
  ['https://www.thetrademarkhoop.com/2021/11/onoma-simata-kataxorisi-dikigoros.html', 'onoma-simata'],
  ['https://www.thetrademarkhoop.com/2021/10/OBI-SIMATA-EUIPO.html', 'obi-simata'],
  ['https://www.thetrademarkhoop.com/2021/10/prosvoli-emporikou-simatos.html', 'prosvoli-simatos'],
  ['https://www.thetrademarkhoop.com/2021/09/EUIPO-OBI-SIMA-ELEGXOS-DIKIGOROS.html', 'euipo-obi-elegxos'],
  ['https://www.thetrademarkhoop.com/2021/07/sima-epwnumia-domain-kataxwrisi.html', 'sima-epwnumia'],
];

function extract(html) {
  const start = html.indexOf("id='post-body'");
  if (start === -1) return { text: '', imgs: [] };
  const endMarker = html.indexOf('post-footer', start);
  const end = endMarker > 0 ? endMarker : start + 30000;
  let body = html.substring(start, end);
  const imgs = [];
  body.replace(/<img[^>]+src=["']([^"']+)["']/gi, (m, url) => { imgs.push(url); });
  body = body.replace(/<br\s*\/?>/gi, '\n');
  body = body.replace(/<\/p>/gi, '\n\n');
  body = body.replace(/<\/h[1-6]>/gi, '\n\n');
  body = body.replace(/<h[1-6][^>]*>/gi, '\n\n');
  body = body.replace(/<\/li>/gi, '\n');
  body = body.replace(/<li[^>]*>/gi, '- ');
  body = body.replace(/<\/?[^>]+>/gi, '');
  body = body.replace(/&nbsp;/g, ' ');
  body = body.replace(/&amp;/g, '&');
  body = body.replace(/&lt;/g, '<');
  body = body.replace(/&gt;/g, '>');
  body = body.replace(/&#39;/g, "'");
  body = body.replace(/&quot;/g, '"');
  body = body.replace(/&#171;/g, '«');
  body = body.replace(/&#187;/g, '»');
  body = body.replace(/&#8220;/g, '"');
  body = body.replace(/&#8221;/g, '"');
  body = body.replace(/&#729;/g, '·');
  body = body.replace(/&#8211;/g, '–');
  body = body.replace(/&#8212;/g, '—');
  const lines = body.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('id='));
  return { text: lines.join('\n'), imgs, lineCount: lines.length };
}

let results = [];
for (const [url, slug] of posts) {
  try {
    execSync(`curl -sL "${url}" -o "extracted/${slug}.html"`, { timeout: 15000 });
    const html = fs.readFileSync(`extracted/${slug}.html`, 'utf-8');
    const { text, imgs, lineCount } = extract(html);
    fs.writeFileSync(`extracted/${slug}.txt`, text, 'utf-8');
    results.push(`${slug}: ${lineCount} lines, ${imgs.length} imgs`);
  } catch(e) {
    results.push(`${slug}: FAILED - ${e.message}`);
  }
}
console.log(results.join('\n'));
