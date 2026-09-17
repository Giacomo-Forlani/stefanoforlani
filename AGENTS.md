# Istruzioni per gli agenti

## Obiettivo del progetto

Migliorare grafica, organizzazione, accessibilità, SEO e GEO del sito `stefanoforlani.com` senza alterarne i contenuti.

## Vincoli sui contenuti

- Non modificare, sintetizzare, correggere, ampliare o rimuovere testi, fotografie, servizi, qualifiche, date, sedi, mappe e recapiti presenti nel sito originale.
- Non introdurre nuove affermazioni mediche, promesse di risultato, testimonianze, FAQ o dati non già presenti nel sito.
- Il sito non ha un copyright: non aggiungere diciture di copyright (©, "Tutti i diritti riservati").
- Il numero personale deve essere sfavorito a livello visivo.
- Le CTA di chiamata devono portare ai contatti, dove l'utente sceglie liberamente tra tutti i recapiti.

## SEO e GEO

- Il dominio canonico è `https://stefanoforlani.com/`.
- Puoi fare tutto per migliorare la geo e la seo, tanto il medico fa tante altre cose oltre alla chirurgia quindi puoi spaziare molto, l'importante è non aggiungere informazioni nella pagina vista dall'utente.

## Sviluppo e pubblicazione

- Il sito è costruito con Astro (output statico in `dist/`) e ospitato tramite Firebase Hosting.
- Tutti i contenuti stanno in `src/data/site.ts`: i componenti in `src/components/` si limitano a impaginarli. JSON-LD (`src/data/schema.ts`), `llms.txt` e `sitemap.xml` sono generati dagli stessi dati.
- Comandi: `npm install`, `npm run dev` (anteprima locale), `npm run build` (genera `dist/`), `npm run preview`.
- Footer (`src/components/Footer.astro`): dati del professionista (partita IVA, domicilio professionale, email, PEC facoltativa) e informativa privacy/cookie, da `legal` e `privacy` in `src/data/site.ts`. Finché un campo obbligatorio è `null`, in sviluppo compare un segnaposto che indica cosa inserire (`legalHints`) e `npm run build` si interrompe. Se si aggiungono servizi di terze parti (statistiche, video, widget) aggiornare l'informativa e valutare il banner cookie.
- Privacy (GDPR): nessuna risorsa di terze parti al caricamento. I font sono in `public/fonts/` (scaricati una volta con `node scripts/scarica-font.mjs`); nessuna mappa incorporata: le sedi hanno un link «Apri nelle mappe» che su mobile apre l'app di mappe del dispositivo (`geo:` su Android, Apple Maps su iOS) e da computer la scheda Google Maps.
- `public/og-image.jpg` (1200×630) è l'immagine social; va rigenerata se cambia il ritratto.
- Il deploy viene effettuato automaticamente tramite GitHub Actions (build Astro + deploy di `dist/`). Committare sempre `package-lock.json`.
- Verificare desktop e mobile dopo ogni modifica sostanziale.
- Ricontrollare i workflow di GitHub Actions prima della pubblicazione e verificare che siano ancora compatibili con la nuova struttura.
- Non eseguire deploy, commit, push o apertura di pull request senza una richiesta esplicita dell'utente.
- Prima di un deploy, proporre un canale preview Firebase e attendere approvazione.
