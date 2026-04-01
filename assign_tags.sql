-- Insert all tags
INSERT OR IGNORE INTO tags (name) VALUES ('ΑΝΑΚΟΠΗ');
INSERT OR IGNORE INTO tags (name) VALUES ('ΑΠΟΜΙΜΗΣΗ');
INSERT OR IGNORE INTO tags (name) VALUES ('ΔΙΑΔΙΚΑΣΙΑ');
INSERT OR IGNORE INTO tags (name) VALUES ('ΔΙΚΗΓΟΡΟΣ');
INSERT OR IGNORE INTO tags (name) VALUES ('ΕΛΕΓΧΟΣ');
INSERT OR IGNORE INTO tags (name) VALUES ('ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ');
INSERT OR IGNORE INTO tags (name) VALUES ('ΕΜΠΟΡΙΚΟ ΣΗΜΑ ΤΗΣ ΕΕ');
INSERT OR IGNORE INTO tags (name) VALUES ('ΚΑΤΑΘΕΣΗ');
INSERT OR IGNORE INTO tags (name) VALUES ('ΚΑΤΑΧΩΡΙΣΗ');
INSERT OR IGNORE INTO tags (name) VALUES ('ΚΑΤΟΧΥΡΩΣΗ');
INSERT OR IGNORE INTO tags (name) VALUES ('ΚΙΝΔΥΝΟΣ ΣΥΓΧΥΣΗΣ');
INSERT OR IGNORE INTO tags (name) VALUES ('ΜΟΡΦΕΣ ΠΡΟΣΒΟΛΗΣ');
INSERT OR IGNORE INTO tags (name) VALUES ('ΠΡΟΣΒΟΛΗ ΣΗΜΑΤΟΣ');
INSERT OR IGNORE INTO tags (name) VALUES ('ΣΗΜΑΤΑ ΦΗΜΗΣ');
INSERT OR IGNORE INTO tags (name) VALUES ('DOMAIN NAMES');
INSERT OR IGNORE INTO tags (name) VALUES ('EUIPO');
INSERT OR IGNORE INTO tags (name) VALUES ('NETFLIX');
INSERT OR IGNORE INTO tags (name) VALUES ('JUVENTUS');
INSERT OR IGNORE INTO tags (name) VALUES ('LA LIGA');
INSERT OR IGNORE INTO tags (name) VALUES ('MILAN');
INSERT OR IGNORE INTO tags (name) VALUES ('TURKAEGEAN');

-- Juventus post
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='trademark-simata-dikigoros-juv' AND t.name IN ('ΑΝΑΚΟΠΗ','EUIPO','JUVENTUS','ΚΑΤΟΧΥΡΩΣΗ','ΕΜΠΟΡΙΚΟ ΣΗΜΑ ΤΗΣ ΕΕ');
-- Netflix post
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='trademark-netflix-euipo' AND t.name IN ('ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ','NETFLIX','EUIPO','ΕΜΠΟΡΙΚΟ ΣΗΜΑ ΤΗΣ ΕΕ','ΚΑΤΑΧΩΡΙΣΗ');
-- Milan AC post
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='emporiko-sima-EE-EUIPO' AND t.name IN ('ΑΝΑΚΟΠΗ','ΚΙΝΔΥΝΟΣ ΣΥΓΧΥΣΗΣ','EUIPO','MILAN','ΕΜΠΟΡΙΚΟ ΣΗΜΑ ΤΗΣ ΕΕ');
-- La Liga post
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='kataxwrisi-sima-euipo' AND t.name IN ('EUIPO','LA LIGA','ΕΜΠΟΡΙΚΟ ΣΗΜΑ ΤΗΣ ΕΕ','ΑΝΑΚΟΠΗ');
-- Turkaegean post
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='emporiko-sima-onoma-turkaegean-euipo-katoxurosi' AND t.name IN ('TURKAEGEAN','EUIPO','ΚΑΤΟΧΥΡΩΣΗ','ΕΜΠΟΡΙΚΟ ΣΗΜΑ ΤΗΣ ΕΕ');
-- Domain name post
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='katoxurwsi-domain-name-kai-emporiko-sima' AND t.name IN ('DOMAIN NAMES','ΚΑΤΟΧΥΡΩΣΗ','ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ','ΚΙΝΔΥΝΟΣ ΣΥΓΧΥΣΗΣ');
-- Prosvoli Part I
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='paraviasi-sima-dikigoros-prostasia' AND t.name IN ('ΚΙΝΔΥΝΟΣ ΣΥΓΧΥΣΗΣ','ΜΟΡΦΕΣ ΠΡΟΣΒΟΛΗΣ','ΠΡΟΣΒΟΛΗ ΣΗΜΑΤΟΣ','ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ','ΚΑΤΑΧΩΡΙΣΗ');
-- Prosvoli Part II
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='sima-dikigoros-prosvoli-katoxurosi' AND t.name IN ('ΚΙΝΔΥΝΟΣ ΣΥΓΧΥΣΗΣ','ΜΟΡΦΕΣ ΠΡΟΣΒΟΛΗΣ','ΠΡΟΣΒΟΛΗ ΣΗΜΑΤΟΣ','EUIPO');
-- Prostasia fimi
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='prostasia-sima-trademark' AND t.name IN ('ΣΗΜΑΤΑ ΦΗΜΗΣ','ΜΟΡΦΕΣ ΠΡΟΣΒΟΛΗΣ','ΠΡΟΣΒΟΛΗ ΣΗΜΑΤΟΣ','ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ');
-- Prosvoli simatos
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='prosvoli-emporikou-simatos' AND t.name IN ('ΜΟΡΦΕΣ ΠΡΟΣΒΟΛΗΣ','ΠΡΟΣΒΟΛΗ ΣΗΜΑΤΟΣ','ΚΙΝΔΥΝΟΣ ΣΥΓΧΥΣΗΣ','ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ');
-- Sima perioussiako
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='emporiko-sima-dikigoros-kataxorisi-katoxurosi' AND t.name IN ('ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ','ΚΑΤΟΧΥΡΩΣΗ','ΚΑΤΑΧΩΡΙΣΗ','EUIPO');
-- Kataxorisi elegxos (HYAL)
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='kataxorisi-simatos-elegxos' AND t.name IN ('ΚΑΤΑΧΩΡΙΣΗ','ΕΛΕΓΧΟΣ','ΕΜΠΟΡΙΚΟ ΣΗΜΑ ΤΗΣ ΕΕ','EUIPO');
-- Kataxwrisi onoma
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='kataxwrisi-onoma-katoxurosi-sima-logo' AND t.name IN ('ΚΑΤΑΘΕΣΗ','ΚΑΤΑΧΩΡΙΣΗ','ΚΑΤΟΧΥΡΩΣΗ','ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ','ΔΙΑΔΙΚΑΣΙΑ');
-- Onoma simata
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='onoma-simata-kataxorisi-dikigoros' AND t.name IN ('ΚΑΤΑΘΕΣΗ','ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ','ΚΑΤΟΧΥΡΩΣΗ','ΔΙΚΗΓΟΡΟΣ');
-- OBI SIMATA
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='OBI-SIMATA-EUIPO' AND t.name IN ('EUIPO','ΕΜΠΟΡΙΚΟ ΣΗΜΑ ΤΗΣ ΕΕ','ΚΑΤΑΧΩΡΙΣΗ','ΕΛΕΓΧΟΣ');
-- EUIPO OBI elegxos
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='EUIPO-OBI-SIMA-ELEGXOS-DIKIGOROS' AND t.name IN ('EUIPO','ΕΛΕΓΧΟΣ','ΚΑΤΑΘΕΣΗ','ΚΑΤΟΧΥΡΩΣΗ','ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ');
-- Sima epwnumia
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='sima-epwnumia-domain-kataxwrisi' AND t.name IN ('ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ','ΚΑΤΟΧΥΡΩΣΗ','DOMAIN NAMES');
-- Sima EE
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='sima-tis-europaikis-enwsis' AND t.name IN ('ΕΜΠΟΡΙΚΟ ΣΗΜΑ ΤΗΣ ΕΕ','ΑΝΑΚΟΠΗ','EUIPO','ΚΑΤΟΧΥΡΩΣΗ');
-- Russia polemos
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='russia-polemos-trademark' AND t.name IN ('ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ','ΚΑΤΟΧΥΡΩΣΗ');
-- Patentes polemos
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='emporiko-sima-patentes-polemos' AND t.name IN ('ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ','ΚΑΤΟΧΥΡΩΣΗ');
-- Branding marketing
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='branding-marketing' AND t.name IN ('ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ','ΑΠΟΜΙΜΗΣΗ');
-- Katoxirosi dhlwsh (HuffPost)
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='katoxirosi-simatos-dhlwsh' AND t.name IN ('ΚΑΤΟΧΥΡΩΣΗ','ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ','ΚΑΤΑΧΩΡΙΣΗ');
-- Sima kataxwrish (HYAL GCEU)
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='emporiko-sima-kataxwrish' AND t.name IN ('ΚΑΤΑΧΩΡΙΣΗ','ΕΜΠΟΡΙΚΟ ΣΗΜΑ ΤΗΣ ΕΕ','EUIPO','ΕΛΕΓΧΟΣ');
-- Sima eidikos (book)
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='emporiko-sima-eidikos' AND t.name IN ('ΚΙΝΔΥΝΟΣ ΣΥΓΧΥΣΗΣ','ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ');
-- Dikaio simatwn
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='dikaio-simatwn' AND t.name IN ('ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ','ΚΑΤΑΧΩΡΙΣΗ','ΚΑΤΟΧΥΡΩΣΗ');
-- Academic publications
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='adwords-google-trademark' AND t.name='ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ';
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='european-intellectual-property-review' AND t.name='ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ';
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='kluwer-trademark-blog-wolters-kluwer-nv' AND t.name='ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ';
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='journal-of-intellectual-property-law' AND t.name='ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ';
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='blog-post' AND t.name='ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ';
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='emporikosimaseminario' AND t.name='ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ';
INSERT OR IGNORE INTO post_tags SELECT p.id, t.id FROM posts p, tags t WHERE p.slug='emporiko-sima-dikigoroi' AND t.name IN ('ΕΜΠΟΡΙΚΑ ΣΗΜΑΤΑ','ΔΙΚΗΓΟΡΟΣ');
