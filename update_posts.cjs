const fs = require('fs');
const path = require('path');

const mapping = [
  ['extracted/emporikosimaseminario.txt', 'src/pages/2024/05/emporikosimaseminario.astro'],
  ['extracted/adwords-google-trademark.txt', 'src/pages/2024/02/adwords-google-trademark.astro'],
  ['extracted/european-ip-review.txt', 'src/pages/2024/01/european-intellectual-property-review.astro'],
  ['extracted/kluwer-trademark.txt', 'src/pages/2024/01/kluwer-trademark-blog-wolters-kluwer-nv.astro'],
  ['extracted/journal-ip-law.txt', 'src/pages/2023/05/journal-of-intellectual-property-law.astro'],
  ['extracted/blog-post.txt', 'src/pages/2023/04/blog-post.astro'],
  ['extracted/dikaio-simatwn.txt', 'src/pages/2022/09/dikaio-simatwn.astro'],
  ['extracted/turkaegean.txt', 'src/pages/2022/07/emporiko-sima-onoma-turkaegean-euipo-katoxurosi.astro'],
  ['extracted/domain-name.txt', 'src/pages/2022/06/katoxurwsi-domain-name-kai-emporiko-sima.astro'],
  ['extracted/katoxirosi-dhlwsh.txt', 'src/pages/2022/06/katoxirosi-simatos-dhlwsh.astro'],
  ['extracted/juventus.txt', 'src/pages/2022/08/trademark-simata-dikigoros-juv.astro'],
  ['extracted/netflix.txt', 'src/pages/2022/04/trademark-netflix-euipo.astro'],
  ['extracted/russia-polemos.txt', 'src/pages/2022/03/russia-polemos-trademark.astro'],
  ['extracted/patentes-polemos.txt', 'src/pages/2022/03/emporiko-sima-patentes-polemos.astro'],
  ['extracted/branding-marketing.txt', 'src/pages/2022/03/branding-marketing.astro'],
  ['extracted/sima-ee.txt', 'src/pages/2022/03/sima-tis-europaikis-enwsis.astro'],
  ['extracted/sima-kataxwrish.txt', 'src/pages/2022/02/emporiko-sima-kataxwrish.astro'],
  ['extracted/sima-eidikos.txt', 'src/pages/2022/02/emporiko-sima-eidikos.astro'],
  ['extracted/sima-dikigoroi.txt', 'src/pages/2022/01/emporiko-sima-dikigoroi.astro'],
  ['extracted/milan-ac.txt', 'src/pages/2022/01/emporiko-sima-EE-EUIPO.astro'],
  ['extracted/kataxorisi-elegxos.txt', 'src/pages/2022/01/kataxorisi-simatos-elegxos.astro'],
  ['extracted/kataxwrisi-onoma.txt', 'src/pages/2022/01/kataxwrisi-onoma-katoxurosi-sima-logo.astro'],
  ['extracted/sima-perioussiako.txt', 'src/pages/2021/11/emporiko-sima-dikigoros-kataxorisi-katoxurosi.astro'],
  ['extracted/prosvoli-part2.txt', 'src/pages/2021/11/sima-dikigoros-prosvoli-katoxurosi.astro'],
  ['extracted/paraviasi.txt', 'src/pages/2021/11/paraviasi-sima-dikigoros-prostasia.astro'],
  ['extracted/la-liga.txt', 'src/pages/2021/11/kataxwrisi-sima-euipo.astro'],
  ['extracted/prostasia-fimi.txt', 'src/pages/2021/11/prostasia-sima-trademark.astro'],
  ['extracted/onoma-simata.txt', 'src/pages/2021/11/onoma-simata-kataxorisi-dikigoros.astro'],
  ['extracted/obi-simata.txt', 'src/pages/2021/10/OBI-SIMATA-EUIPO.astro'],
  ['extracted/prosvoli-simatos.txt', 'src/pages/2021/10/prosvoli-emporikou-simatos.astro'],
  ['extracted/euipo-obi-elegxos.txt', 'src/pages/2021/09/EUIPO-OBI-SIMA-ELEGXOS-DIKIGOROS.astro'],
  ['extracted/sima-epwnumia.txt', 'src/pages/2021/07/sima-epwnumia-domain-kataxwrisi.astro'],
];

let updated = 0, skipped = 0;

for (const [txtFile, astroFile] of mapping) {
  try {
    if (!fs.existsSync(txtFile)) { console.log(`SKIP ${txtFile} - not found`); skipped++; continue; }
    const content = fs.readFileSync(txtFile, 'utf-8').trim();
    if (!content || content.length < 10) { console.log(`SKIP ${txtFile} - too short`); skipped++; continue; }
    
    const astro = fs.readFileSync(astroFile, 'utf-8');
    
    // Find the post-content div and replace its inner content
    const contentStart = astro.indexOf('<div class="post-content">');
    const contentEnd = astro.indexOf('</div>', contentStart + 26);
    
    if (contentStart === -1 || contentEnd === -1) {
      console.log(`SKIP ${astroFile} - no post-content div found`);
      skipped++;
      continue;
    }
    
    // Convert text lines to HTML paragraphs
    const lines = content.split('\n').filter(l => l.trim());
    // Remove sidebar/footer content
    const cleanLines = [];
    for (const line of lines) {
      if (line.startsWith('Popular Posts') || line.startsWith('Categories') || 
          line.startsWith('Tags') || line.startsWith('- ΑΝΑΚΟΠΗ') || 
          line.startsWith('- ΑΠΟΜΙΜΗΣΗ') || line.startsWith('- ΔΙΑΔΙΚΑΣΙΑ') ||
          line.startsWith('- ΔΙΚΗΓΟΡΟΣ') || line.startsWith('- ΕΛΕΓΧΟΣ') ||
          line.startsWith('- ΕΜΠΟΡΙΚΑ') || line.startsWith('- ΕΜΠΟΡΙΚΟ') ||
          line.startsWith('- ΙΣΤΟΣΕΛΙΔΕΣ') || line.startsWith('- ΚΑΤΑΘΕΣΗ') ||
          line.startsWith('- ΚΑΤΑΧΩΡΙΣΗ') || line.startsWith('- ΚΑΤΟΧΥΡΩΣΗ') ||
          line.startsWith('- ΚΙΝΔΥΝΟΣ') || line.startsWith('- ΜΟΡΦΕΣ') ||
          line.startsWith('- ΟΔΗΓΟΣ') || line.startsWith('- ΠΡΟΣΒΟΛΗ') ||
          line.startsWith('- ΣΗΜΑΤΑ') || line.startsWith('- DOMAIN') ||
          line.startsWith('- EUIPO') || line.startsWith('- EUROPEAN') ||
          line.startsWith('- JUVENTUS') || line.startsWith('- LA LIGA') ||
          line.startsWith('- MILAN') || line.startsWith('- NETFLIX') ||
          line.startsWith('- TURKAEGEAN') || line.includes('Φεβρουαρίου 07, 2024') ||
          line.includes('Απριλίου 26, 2023') || line.includes('Ιανουαρίου 03, 2024') ||
          line.startsWith('Επιστημονική Δημοσίευση στο')) {
        break; // Stop at sidebar content
      }
      cleanLines.push(line);
    }
    
    let htmlContent = cleanLines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      // Detect headings (Roman numerals or numbered sections)
      if (/^(I{1,3}V?|IV|V|VI{0,3})\.\s/.test(trimmed) || /^\[.*\]$/.test(trimmed)) {
        return `      <h2>${trimmed}</h2>`;
      }
      if (trimmed.startsWith('- ')) {
        return `      <p>${trimmed}</p>`;
      }
      return `      <p>${trimmed}</p>`;
    }).join('\n');
    
    const newAstro = astro.substring(0, contentStart + 26) + '\n' + htmlContent + '\n    ' + astro.substring(contentEnd);
    fs.writeFileSync(astroFile, newAstro, 'utf-8');
    updated++;
    console.log(`OK ${path.basename(astroFile)} - ${cleanLines.length} paragraphs`);
  } catch(e) {
    console.log(`ERROR ${astroFile}: ${e.message}`);
    skipped++;
  }
}
console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
