# Istruzioni per gli agenti

## Obiettivo del progetto

Migliorare grafica, organizzazione, accessibilità, SEO e GEO del sito `stefanoforlani.com` senza alterarne i contenuti.

## Vincoli sui contenuti

- Non modificare, sintetizzare, correggere, ampliare o rimuovere testi, fotografie, servizi, qualifiche, date, sedi, mappe e recapiti presenti nel sito originale.
- Non introdurre nuove affermazioni mediche, promesse di risultato, testimonianze, FAQ o dati non già presenti nel sito.
- Il dottore **esercita** come chirurgo plastico ma **non è specializzato in chirurgia plastica**: le sue specializzazioni sono Chirurgia Generale e Chirurgia Toracica (vedi «Formazione Accademica e Professionale» in `src/data/site.ts`). Non scrivere mai «specializzato in chirurgia plastica» né varianti in meta tag, JSON-LD, `llms.txt` o testi di pagina: usare «chirurgo plastico», «esperienza in chirurgia plastica, ricostruttiva ed estetica» o la qualifica esatta.
- Il sito non ha un copyright: non aggiungere diciture di copyright (©, "Tutti i diritti riservati").
- Il numero personale deve essere sfavorito a livello visivo.
- Le CTA di chiamata devono portare ai contatti, dove l'utente sceglie liberamente tra tutti i recapiti.

## SEO e GEO

- Il dominio canonico è `https://stefanoforlani.com/`.
- Puoi fare tutto per migliorare la geo e la seo, tanto il medico fa tante altre cose oltre alla chirurgia quindi puoi spaziare molto, l'importante è non aggiungere informazioni nella pagina vista dall'utente.

## Sviluppo

- Il sito è costruito con Astro (output statico in `dist/`) e ospitato tramite Firebase Hosting (progetto `stefanoforlani-38ca0`).
- Tutti i contenuti stanno in `src/data/site.ts`: i componenti in `src/components/` si limitano a impaginarli. JSON-LD (`src/data/schema.ts`), `llms.txt` e `sitemap.xml` sono generati dagli stessi dati.
- Comandi locali: `npm install`, `npm run dev` (anteprima locale), `npm run build` (genera `dist/`, solo per verifica), `npm run preview`.
- Footer (`src/components/Footer.astro`): dati del professionista (partita IVA, email, PEC facoltativa) e informativa privacy/cookie, da `legal` e `privacy` in `src/data/site.ts`. Finché un campo obbligatorio è `null`, in sviluppo e nelle anteprime compare un segnaposto che indica cosa inserire (`legalHints`), mentre la build di produzione si interrompe. Solo il workflow delle anteprime imposta `ALLOW_MISSING_LEGAL=true`: non usarlo altrove. Se si aggiungono servizi di terze parti (statistiche, video, widget) aggiornare l'informativa e valutare il banner cookie.
- Privacy (GDPR): nessuna risorsa di terze parti al caricamento. I font sono in `public/fonts/` (scaricati una volta con `node scripts/scarica-font.mjs`; i file sorgente in `fonts-originali/` non sono versionati); nessuna mappa incorporata: le sedi hanno un link «Apri nelle mappe» che su mobile apre l'app di mappe del dispositivo (`geo:` su Android, Apple Maps su iOS) e da computer la scheda Google Maps.
- `public/og-image.jpg` (1200×630) è l'immagine social; va rigenerata se cambia il ritratto.
- Verificare desktop e mobile dopo ogni modifica sostanziale.

## Modifiche, build e pubblicazione

- Le modifiche richieste si applicano solo in locale: verificarle con `npm run dev` (o `npm run build`) su desktop e mobile.
- Commit e push si fanno solo su richiesta esplicita dell'utente. Si lavora direttamente su `main`.
- Build e deploy avvengono solo su GitHub Actions: non eseguire deploy dal computer locale (`firebase deploy`) e non versionare `dist/`.
- Un push su `main` pubblica il sito: `.github/workflows/firebase-hosting-live.yml` esegue `npm ci`, la build e il deploy sul canale `live`. Il workflow si può avviare anche a mano da GitHub.
- Se viene aperta una pull request verso `main`, `.github/workflows/firebase-hosting-pull-request.yml` pubblica un'anteprima su un canale preview Firebase (scade dopo 7 giorni) e commenta la PR con l'URL.
- Committare sempre `package-lock.json`: i workflow usano `npm ci`.
- L'autenticazione a Firebase usa il segreto di repository `FIREBASE_SERVICE_ACCOUNT`; non inserire credenziali nel codice.
- Se cambia la struttura (cartella di output, versione di Node, comandi), aggiornare i workflow e ricontrollarli prima del push.
