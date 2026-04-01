const fs = require('fs');

const posts = [
  { slug: 'emporikosimaseminario', title: 'Emporiko Sima: Seminario', date: '2024-05-04', file: 'emporikosimaseminario', url: '/2024/05/emporikosimaseminario.html' },
  { slug: 'adwords-google-trademark', title: 'Google Ads & Trademarks - DITE', date: '2024-02-07', file: 'adwords-google-trademark', url: '/2024/02/adwords-google-trademark.html' },
  { slug: 'european-intellectual-property-review', title: 'European Intellectual Property Review', date: '2024-01-03', file: 'european-ip-review', url: '/2024/01/european-intellectual-property-review.html' },
  { slug: 'kluwer-trademark-blog-wolters-kluwer-nv', title: 'Kluwer Trademark Blog', date: '2024-01-03', file: 'kluwer-trademark', url: '/2024/01/kluwer-trademark-blog-wolters-kluwer-nv.html' },
  { slug: 'journal-of-intellectual-property-law', title: 'Journal of Intellectual Property Law & Practice', date: '2023-05-07', file: 'journal-ip-law', url: '/2023/05/journal-of-intellectual-property-law.html' },
  { slug: 'blog-post', title: 'SYNIGOROS - Nomiki Vivliothiki', date: '2023-04-26', file: 'blog-post', url: '/2023/04/blog-post.html' },
  { slug: 'dikaio-simatwn', title: 'To dikaio ton simaton - Syllogiko Ergo', date: '2022-09-01', file: 'dikaio-simatwn', url: '/2022/09/dikaio-simatwn.html' },
  { slug: 'emporiko-sima-kataxwrish', title: 'HYAL - GCEU Case T-215/20', date: '2022-02-01', file: 'sima-kataxwrish', url: '/2022/02/emporiko-sima-kataxwrish.html' },
  { slug: 'emporiko-sima-eidikos', title: 'O kindynos sygchysis sto dikaio tou simatos', date: '2022-02-01', file: 'sima-eidikos', url: '/2022/02/emporiko-sima-eidikos.html' },
  { slug: 'emporiko-sima-dikigoroi', title: 'Dikigoroi Emporikon Simaton - Ekdilosi', date: '2022-01-01', file: 'sima-dikigoroi', url: '/2022/01/emporiko-sima-dikigoroi.html' },
  { slug: 'emporiko-sima-onoma-turkaegean-euipo-katoxurosi', title: 'Turkaegean: O Atatourk kai 11 skepseis', date: '2022-07-01', file: 'turkaegean', url: '/2022/07/emporiko-sima-onoma-turkaegean-euipo-katoxurosi.html' },
  { slug: 'katoxurwsi-domain-name-kai-emporiko-sima', title: 'Katochyrosi domain name os emporiko sima', date: '2022-06-01', file: 'domain-name', url: '/2022/06/katoxurwsi-domain-name-kai-emporiko-sima.html' },
  { slug: 'kataxwrisi-onoma-katoxurosi-sima-logo', title: 'Katathesi emporikou simatos - i diadikasia', date: '2022-01-01', file: 'kataxwrisi-onoma', url: '/2022/01/kataxwrisi-onoma-katoxurosi-sima-logo.html' },
  { slug: 'emporiko-sima-EE-EUIPO', title: 'Milan AC - Enas agonas pou den kerdithike', date: '2022-01-01', file: 'milan-ac', url: '/2022/01/emporiko-sima-EE-EUIPO.html' },
  { slug: 'kataxorisi-simatos-elegxos', title: 'Mia ypothesi ellinikon symferonton - to sychnotero lathos', date: '2022-01-01', file: 'kataxorisi-elegxos', url: '/2022/01/kataxorisi-simatos-elegxos.html' },
  { slug: 'trademark-simata-dikigoros-juv', title: 'I katochyrosi tou neou simatos tis Juventus', date: '2022-08-15', file: 'juventus', url: '/2022/08/trademark-simata-dikigoros-juv.html' },
  { slug: 'katoxirosi-simatos-dhlwsh', title: 'Oi sygchrones meletes gia tin katochyrosi emporikou simatos', date: '2022-06-03', file: 'katoxirosi-dhlwsh', url: '/2022/06/katoxirosi-simatos-dhlwsh.html' },
  { slug: 'trademark-netflix-euipo', title: 'Otan to Netflix epicheireise na katachorisei to ichitiko tou os sima EE', date: '2022-04-01', file: 'netflix', url: '/2022/04/trademark-netflix-euipo.html' },
  { slug: 'emporiko-sima-dikigoros-kataxorisi-katoxurosi', title: 'To emporiko sima os periousiako stoicheio', date: '2021-11-09', file: 'sima-perioussiako', url: '/2021/11/emporiko-sima-dikigoros-kataxorisi-katoxurosi.html' },
  { slug: 'sima-dikigoros-prosvoli-katoxurosi', title: 'Prosvoli trademark - part II', date: '2021-11-09', file: 'prosvoli-part2', url: '/2021/11/sima-dikigoros-prosvoli-katoxurosi.html' },
  { slug: 'paraviasi-sima-dikigoros-prostasia', title: 'Prosvoli trademark - part I', date: '2021-11-09', file: 'paraviasi', url: '/2021/11/paraviasi-sima-dikigoros-prostasia.html' },
  { slug: 'kataxwrisi-sima-euipo', title: 'EUIPO - La Liga simeiosate 1', date: '2021-11-09', file: 'la-liga', url: '/2021/11/kataxwrisi-sima-euipo.html' },
  { slug: 'prostasia-sima-trademark', title: 'I prosvoli tou simatos - to sima fimis', date: '2021-11-09', file: 'prostasia-fimi', url: '/2021/11/prostasia-sima-trademark.html' },
  { slug: 'onoma-simata-kataxorisi-dikigoros', title: 'Katathesi emporikou simatos - ola osa prepei na gnorizete', date: '2021-11-03', file: 'onoma-simata', url: '/2021/11/onoma-simata-kataxorisi-dikigoros.html' },
  { slug: 'russia-polemos-trademark', title: 'O polemos stin Oukrania kai i Peppa to gourounaki', date: '2022-03-01', file: 'russia-polemos', url: '/2022/03/russia-polemos-trademark.html' },
  { slug: 'emporiko-sima-patentes-polemos', title: 'I Megali Exodos apo tin agora tis Rosias', date: '2022-03-01', file: 'patentes-polemos', url: '/2022/03/emporiko-sima-patentes-polemos.html' },
  { slug: 'branding-marketing', title: 'To peristatiko me ti giagia sta Lidl', date: '2022-03-01', file: 'branding-marketing', url: '/2022/03/branding-marketing.html' },
  { slug: 'OBI-SIMATA-EUIPO', title: 'Allagi paradeigmatos apo to GDEE - symperasmata gia ton OBI', date: '2021-10-06', file: 'obi-simata', url: '/2021/10/OBI-SIMATA-EUIPO.html' },
  { slug: 'sima-tis-europaikis-enwsis', title: 'I katachorisi emporikou simatos tis EE kai i amyna se pithani anakopi', date: '2022-03-01', file: 'sima-ee', url: '/2022/03/sima-tis-europaikis-enwsis.html' },
  { slug: 'prosvoli-emporikou-simatos', title: 'Fakelos: Katathesi simatos - Pote prosvalletai to emporiko mou sima', date: '2021-10-01', file: 'prosvoli-simatos', url: '/2021/10/prosvoli-emporikou-simatos.html' },
  { slug: 'EUIPO-OBI-SIMA-ELEGXOS-DIKIGOROS', title: 'O aparaititos elegchos prin tin katathesi dilosis ston EUIPO kai ton OBI', date: '2021-09-02', file: 'euipo-obi-elegxos', url: '/2021/09/EUIPO-OBI-SIMA-ELEGXOS-DIKIGOROS.html' },
  { slug: 'sima-epwnumia-domain-kataxwrisi', title: 'Mporo na echo dikaioma se endeixi choris katachorisi simatos', date: '2021-07-01', file: 'sima-epwnumia', url: '/2021/07/sima-epwnumia-domain-kataxwrisi.html' },
];

let count = 0;
for (const post of posts) {
  const txtFile = `extracted/${post.file}.txt`;
  let content = '';
  try {
    content = fs.readFileSync(txtFile, 'utf-8').trim();
  } catch(e) {
    content = post.title;
  }

  const lines = content.split('\n');
  const cleanLines = [];
  for (const line of lines) {
    if (line.startsWith('Popular Posts') || line.startsWith('Categories') || line.startsWith('Tags') || line.startsWith('- ΑΝΑΚΟΠΗ')) break;
    cleanLines.push(line);
  }

  const md = `---
title: "${post.title.replace(/"/g, '\\"')}"
date: "${post.date}"
author: "Giannis Psarakis"
slug: "${post.slug}"
originalUrl: "${post.url}"
---

${cleanLines.join('\n\n')}
`;

  fs.writeFileSync(`src/content/blog/${post.slug}.md`, md, 'utf-8');
  count++;
}
console.log(`Created ${count} markdown files`);
