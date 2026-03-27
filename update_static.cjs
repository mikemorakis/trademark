const fs = require('fs');

const mapping = [
  ['thehoop_content.txt', 'src/pages/p/trademark-hoop_26.astro'],
  ['wedo_content.txt', 'src/pages/p/we-do.astro'],
  ['faq_content.txt', 'src/pages/p/trademark-hoop.astro'],
  ['who_content.txt', 'src/pages/p/who.astro'],
];

for (const [txtFile, astroFile] of mapping) {
  const content = fs.readFileSync(txtFile, 'utf-8').trim();
  const astro = fs.readFileSync(astroFile, 'utf-8');
  
  // Find content between the opening > after PageLayout/BaseLayout and closing tag
  // Static pages use different patterns - find the slot content
  const lines = content.split('\n').filter(l => l.trim() && !l.startsWith("id='post-body'") && !l.startsWith('Popular Posts') && !l.startsWith('Categories') && !l.startsWith('Tags') && !l.match(/^- [Α-Ω]{2,}$/) && !l.includes('Φεβρουαρίου 07, 2024') && !l.includes('Απριλίου 26, 2023') && !l.includes('Ιανουαρίου 03, 2024'));
  
  // Remove sidebar content
  const clean = [];
  for (const line of lines) {
    if (line.startsWith('Popular Posts') || line.startsWith('Επιστημονική Δημοσίευση στο')) break;
    clean.push(line);
  }
  
  const html = clean.map(l => {
    const t = l.trim();
    if (/^(I{1,3}V?|IV|V|VI{0,3})\.\s/.test(t)) return `    <h2>${t}</h2>`;
    if (/^\[.*\]$/.test(t)) return `    <h2>${t}</h2>`;
    if (t.startsWith('- ')) return `    <li>${t.substring(2)}</li>`;
    return `    <p>${t}</p>`;
  }).join('\n');
  
  // Find the content area in the astro file
  const pageContentStart = astro.indexOf('<div class="page-content">');
  const lastClosingDiv = astro.lastIndexOf('</PostLayout>') > 0 ? astro.lastIndexOf('</PostLayout>') : astro.lastIndexOf('</BaseLayout>');
  
  if (pageContentStart > 0) {
    // Has page-content div
    const afterDiv = pageContentStart + '<div class="page-content">'.length;
    const closingDiv = astro.indexOf('</div>', afterDiv);
    const newAstro = astro.substring(0, afterDiv) + '\n' + html + '\n  ' + astro.substring(closingDiv);
    fs.writeFileSync(astroFile, newAstro, 'utf-8');
    console.log('OK (page-content) ' + astroFile + ' - ' + clean.length + ' lines');
  } else {
    console.log('SKIP ' + astroFile + ' - no page-content div');
  }
}
