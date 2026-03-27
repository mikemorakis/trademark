const fs = require('fs');

const mapping = [
  ['extracted/emporikosimaseminario.html', 'src/pages/2024/05/emporikosimaseminario.astro'],
  ['extracted/adwords-google-trademark.html', 'src/pages/2024/02/adwords-google-trademark.astro'],
  ['extracted/european-ip-review.html', 'src/pages/2024/01/european-intellectual-property-review.astro'],
  ['extracted/kluwer-trademark.html', 'src/pages/2024/01/kluwer-trademark-blog-wolters-kluwer-nv.astro'],
  ['extracted/journal-ip-law.html', 'src/pages/2023/05/journal-of-intellectual-property-law.astro'],
  ['extracted/blog-post.html', 'src/pages/2023/04/blog-post.astro'],
  ['extracted/dikaio-simatwn.html', 'src/pages/2022/09/dikaio-simatwn.astro'],
  ['extracted/turkaegean.html', 'src/pages/2022/07/emporiko-sima-onoma-turkaegean-euipo-katoxurosi.astro'],
  ['extracted/domain-name.html', 'src/pages/2022/06/katoxurwsi-domain-name-kai-emporiko-sima.astro'],
  ['extracted/katoxirosi-dhlwsh.html', 'src/pages/2022/06/katoxirosi-simatos-dhlwsh.astro'],
  ['extracted/juventus.html', 'src/pages/2022/08/trademark-simata-dikigoros-juv.astro'],
  ['extracted/netflix.html', 'src/pages/2022/04/trademark-netflix-euipo.astro'],
  ['extracted/russia-polemos.html', 'src/pages/2022/03/russia-polemos-trademark.astro'],
  ['extracted/patentes-polemos.html', 'src/pages/2022/03/emporiko-sima-patentes-polemos.astro'],
  ['extracted/branding-marketing.html', 'src/pages/2022/03/branding-marketing.astro'],
  ['extracted/sima-ee.html', 'src/pages/2022/03/sima-tis-europaikis-enwsis.astro'],
  ['extracted/sima-kataxwrish.html', 'src/pages/2022/02/emporiko-sima-kataxwrish.astro'],
  ['extracted/sima-eidikos.html', 'src/pages/2022/02/emporiko-sima-eidikos.astro'],
  ['extracted/sima-dikigoroi.html', 'src/pages/2022/01/emporiko-sima-dikigoroi.astro'],
  ['extracted/milan-ac.html', 'src/pages/2022/01/emporiko-sima-EE-EUIPO.astro'],
  ['extracted/kataxorisi-elegxos.html', 'src/pages/2022/01/kataxorisi-simatos-elegxos.astro'],
  ['extracted/kataxwrisi-onoma.html', 'src/pages/2022/01/kataxwrisi-onoma-katoxurosi-sima-logo.astro'],
  ['extracted/sima-perioussiako.html', 'src/pages/2021/11/emporiko-sima-dikigoros-kataxorisi-katoxurosi.astro'],
  ['extracted/prosvoli-part2.html', 'src/pages/2021/11/sima-dikigoros-prosvoli-katoxurosi.astro'],
  ['extracted/paraviasi.html', 'src/pages/2021/11/paraviasi-sima-dikigoros-prostasia.astro'],
  ['extracted/la-liga.html', 'src/pages/2021/11/kataxwrisi-sima-euipo.astro'],
  ['extracted/prostasia-fimi.html', 'src/pages/2021/11/prostasia-sima-trademark.astro'],
  ['extracted/onoma-simata.html', 'src/pages/2021/11/onoma-simata-kataxorisi-dikigoros.astro'],
  ['extracted/obi-simata.html', 'src/pages/2021/10/OBI-SIMATA-EUIPO.astro'],
  ['extracted/prosvoli-simatos.html', 'src/pages/2021/10/prosvoli-emporikou-simatos.astro'],
  ['extracted/euipo-obi-elegxos.html', 'src/pages/2021/09/EUIPO-OBI-SIMA-ELEGXOS-DIKIGOROS.astro'],
  ['extracted/sima-epwnumia.html', 'src/pages/2021/07/sima-epwnumia-domain-kataxwrisi.astro'],
];

// Collect all unique image URLs from post-body sections
const allImgs = new Set();
const postImgs = {};

for (const [htmlFile, astroFile] of mapping) {
  const html = fs.readFileSync(htmlFile, 'utf-8');
  const start = html.indexOf("id='post-body'");
  if (start === -1) continue;
  const endMarker = html.indexOf('post-footer', start);
  const end = endMarker > 0 ? endMarker : start + 30000;
  const body = html.substring(start, end);
  
  const imgs = [];
  const re = /<img[^>]+src=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(body)) !== null) {
    const url = m[1];
    // Skip tiny tracking pixels and site logo
    if (url.includes('s231') || url.includes('w72-h72') || url.includes('favicon')) continue;
    imgs.push(url);
    allImgs.add(url);
  }
  postImgs[astroFile] = imgs;
}

// Generate download commands
const imgList = [...allImgs];
console.log('Total unique images: ' + imgList.length);
console.log('\n=== DOWNLOAD COMMANDS ===');
imgList.forEach((url, i) => {
  const ext = url.match(/\.(png|jpg|jpeg|webp|gif|svg)/i);
  const extension = ext ? ext[1].toLowerCase() : 'jpg';
  const filename = 'img-' + String(i+1).padStart(2,'0') + '.' + extension;
  console.log(`curl -sL "${url}" -o "public/images/${filename}"`);
});

// Generate astro file updates
console.log('\n=== POST IMAGE MAP ===');
for (const [astroFile, imgs] of Object.entries(postImgs)) {
  if (imgs.length > 0) {
    const localPaths = imgs.map(url => {
      const idx = imgList.indexOf(url);
      const ext = url.match(/\.(png|jpg|jpeg|webp|gif|svg)/i);
      const extension = ext ? ext[1].toLowerCase() : 'jpg';
      return '/images/img-' + String(idx+1).padStart(2,'0') + '.' + extension;
    });
    console.log(astroFile + ' -> ' + localPaths.join(', '));
  }
}

// Save image map for later use
fs.writeFileSync('image_map.json', JSON.stringify({imgList: imgList.map((url, i) => {
  const ext = url.match(/\.(png|jpg|jpeg|webp|gif|svg)/i);
  const extension = ext ? ext[1].toLowerCase() : 'jpg';
  return { url, local: '/images/img-' + String(i+1).padStart(2,'0') + '.' + extension };
}), postImgs}, null, 2));

