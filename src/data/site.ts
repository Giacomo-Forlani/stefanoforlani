/**
 * Unica fonte dei contenuti del sito.
 * I testi sono riportati fedelmente dal sito originale: non modificarli
 * (vedi AGENTS.md). I componenti si limitano a impaginarli.
 */

export const site = {
  url: 'https://stefanoforlani.com/',
  name: 'Dr. Stefano Forlani',
  shortName: 'Dottor Forlani',
  lang: 'it',
  locale: 'it_IT',
  themeColor: '#17352f',
  lastModified: '2026-09-17',
  city: 'Acqui Terme',
  postalCode: '15011',
  title: 'Dr. Stefano Forlani | Chirurgo plastico ad Acqui Terme',
  shareTitle: 'Dr. Stefano Forlani - Chirurgo Plastico ad Acqui Terme',
  description:
    'Dr. Stefano Forlani, chirurgo plastico con 40 anni di esperienza. Specializzato in chirurgia plastica, ricostruttiva ed estetica ad Acqui Terme. Consulenze personalizzate.',
  shareDescription:
    'Chirurgo plastico specializzato in chirurgia plastica, ricostruttiva ed estetica con 40 anni di esperienza.',
  tagline: 'Chirurgo Plastico con 40 anni di esperienza',
  reviewUrl:
    'https://search.google.com/local/writereview?placeid=ChIJ4YFXmUPV0hIR7CrseATXDcM',
} as const;

/** Stesso ordine delle sezioni in pagina. `cta` = voce evidenziata come pulsante. */
export const nav: readonly { href: string; label: string; cta?: boolean }[] = [
  { href: '#servizi', label: 'Servizi' },
  { href: '#chi-sono', label: 'Chi Sono' },
  { href: '#professione', label: 'Professione' },
  { href: '#contatti', label: 'Contatti', cta: true },
  { href: '#recensioni', label: 'Recensione' },
];

export const hero = {
  kicker: 'Dr. Stefano Forlani',
  /** Il titolo va a capo sempre in questi punti */
  titleLines: ["L'arte della", 'chirurgia', 'plastica'],
  subtitle: 'La scienza del benessere',
  primaryCta: { href: '#contatti', label: 'Contattami' },
  secondaryCta: { href: '#servizi', label: 'Scopri i Servizi' },
  photoAlt: 'Dottor Stefano Forlani',
  photoCaption: 'Dottor Stefano Forlani',
} as const;

export interface Service {
  /** Ancora e identificatore per dati strutturati */
  id: string;
  title: string;
  summary: string;
  items: string[];
}

export const services = {
  kicker: 'Servizi',
  title: 'Servizi Offerti',
  intro: 'Soluzioni personalizzate per ogni esigenza estetica e funzionale',
  list: [
    {
      id: 'deformita-volto-contorno-corporeo',
      title: 'Deformità del volto e del contorno corporeo',
      summary: 'Procedure ricostruttive e modellanti su misura.',
      items: [
        'Riparazione chirurgica di deformità congenite o acquisite',
        'Correzione di deformità delle mammelle',
        "Correzione di deformità dell'ombelico",
        'Correzione di deformità delle orecchie',
        'Correzione di addome pendulo',
        'Asportazione di adiposità localizzate',
        'Correzione di Ectropion ed Entropion',
        'Asportazione chirurgica del calazio',
        'Asportazione di cisti',
      ],
    },
    {
      id: 'riparazione-estetica-funzionale',
      title: 'Riparazione estetica e funzionale',
      summary: 'Soluzioni integrate per rigenerare tessuti e funzioni.',
      items: [
        'Correzione di esiti cicatriziali',
        'Plastiche riparative semplici e complesse',
        'Riparazione estetica di ferite traumatiche',
        'Trattamento medico e chirurgico di ulcere',
        'Revisione di interventi pregressi',
        'Carbossiterapia',
        'Polinucleotidi',
        'Cellule staminali',
        'Lipofilling',
        'Esosomi',
      ],
    },
    {
      id: 'medicina-estetica',
      title: 'Medicina estetica',
      summary: 'Trattamenti mirati per valorizzare la tua immagine.',
      items: [
        'Lifting con fili per volto, mammelle e glutei',
        'Filler con acido ialuronico',
        'Peeling chimici e fisici',
        'Lipofilling e cellule staminali',
        'Esosomi e polinucleotidi',
        'Carbossiterapia',
        'Radiofrequenze monopolari e bipolari',
        'Endolaser',
        'Fili rivitalizzanti',
        'Trattamento patologie venose o linfatiche',
        "Trattamento dell'acne",
        'Programmi personalizzati anti-age',
      ],
    },
    {
      id: 'chirurgia-estetica-corpo-volto',
      title: 'Chirurgia estetica del corpo e del volto',
      summary: 'Interventi mirati per ridefinire proporzioni e volumi.',
      items: [
        'Chirurgia estetica delle mammelle',
        'Addominoplastica',
        'Gluteoplastica',
        'Lifting interno cosce',
        'Lifting braccia',
        'Blefaroplastica e cantoplastica',
        'Lifting del volto',
        'Otoplastica',
        'Rinoplastica',
      ],
    },
    {
      id: 'tumori-cutanei',
      title: 'Diagnosi e trattamento dei tumori cutanei',
      summary: 'Percorsi completi di prevenzione, cura e ricostruzione.',
      items: [
        'Diagnosi dei tumori cutanei maligni e benigni',
        'Asportazione e riparazione con plastiche',
        'Visita diagnostica e mappatura dei nei',
        'Ricostruzione di tessuti mancanti',
        'Enucleazione di lipomi',
      ],
    },
  ] satisfies Service[],
};

export interface Phone {
  /** Come mostrato all'utente */
  display: string;
  /** Formato E.164 per i link tel: */
  tel: string;
}

export interface Contact {
  name: string;
  phones: Phone[];
}

export const contacts = {
  kicker: 'Contatti',
  title: 'Contatti',
  intro: 'Per prenotazioni e informazioni',
  /** Numero personale del medico: da sfavorire visivamente (AGENTS.md) */
  personal: {
    name: 'Dottor Forlani',
    phones: [{ display: '347 826 9990', tel: '+393478269990' }],
  } satisfies Contact,
};

export interface InfoPanel {
  title: string;
  items: string[];
  /** Larghezza su griglia a 12 colonne (desktop) */
  span: 5 | 6 | 7 | 12;
}

export const about = {
  kicker: 'Chi Sono',
  title: 'Chi Sono',
  lead: 'Chirurgo Plastico con 40 anni di esperienza',
  intro: "Un percorso professionale dedicato all'eccellenza nella chirurgia plastica",
  /** Testo spostato invariato dalla hero */
  story:
    "Nato professionalmente negli anni 1986-1989 in Africa per l'attenzione rivolta, durante un periodo di volontariato, ai pazienti ustionati, in particolare per la passione nel ridare una vita normale a coloro che presentavano gravi sequele cicatriziali. I principali punti di forza comprendono un'elevata esperienza, un'estrema accuratezza, l'adozione di tecniche e apparecchiature all'avanguardia e la flessibilità nell'utilizzo di percorsi ottimali per il raggiungimento degli obiettivi, grazie a metodiche e sequenze personalizzate",
  panels: [
    {
      title: 'Specializzazioni e Corsi',
      span: 6,
      items: [
        'Mesi di frequenza presso la 37esima enfermaria della Santa Casa de Misericordia di Rio de Janeiro, Brasile, diretta dal Prof. Ivo Pitanguy',
        'Frequenza presso la clinica del Prof. Ivo Pitanguy a Rio de Janeiro, Brasile',
        'Corso annuale di Chirurgia Plastica presso la Fondazione San Venero Rosselli a Milano',
        "Corso dissettivo a Malta sull'anatomia del volto",
      ],
    },
    {
      title: 'Pubblicazioni e Collaborazioni',
      span: 6,
      items: [
        'Autore di varie pubblicazioni scientifiche',
        'Più di 60 articoli di Medicina e Chirurgia Estetica per la rivista Obiettivo Benessere',
        "Lezioni magistrali di Chirurgia Plastica per Master dell'Università degli Studi di Pavia fino al 2019",
      ],
    },
    {
      title: 'Competenze Tecniche Specifiche',
      span: 5,
      items: [
        "Esperienza nell'uso dei fillers e dei fili di sostegno cutaneo",
        "Esperienza nell'uso del laser co² continuo, pulsato, super pulsato e frazionato",
        'Esperienza con il laser a diodo vascolare e con fibra ottica',
        "Esperienza nell'uso del laser Neodimio-Yag e della luce pulsata",
      ],
    },
    {
      title: 'Formazione Accademica e Professionale',
      span: 7,
      items: [
        'Laurea in Medicina e Chirurgia',
        'Specializzazione in Chirurgia Generale, con tesi sulle "plastiche riparative per tumori cutanei del volto"',
        'Specializzazione in Chirurgia Toracica',
        'Frequenza presso la Chirurgia Plastica del Policlinico S. Orsola di Bologna, diretto dal Prof. Cavina',
        "Frequenza presso il reparto di Chirurgia Plastica dell'Ospedale Civile di Bergamo diretto dal Prof. Leidi",
        'Corso di Chirurgia Plastica presso l\'Università degli Studi di Pavia',
        'Numerosi corsi di aggiornamento su tecniche specifiche di Chirurgia Plastica ed Estetica e di Medicina Estetica',
      ],
    },
  ] satisfies InfoPanel[],
  languagesTitle: 'Competenze Linguistiche',
  languages: [
    { name: 'Inglese', code: 'en', level: 'Fluente scritto e parlato' },
    { name: 'Spagnolo', code: 'es', level: 'Fluente scritto e parlato' },
    { name: 'Francese', code: 'fr', level: 'Livello scolastico' },
  ],
};

export const career = {
  kicker: 'Professione',
  title: 'Esperienza Professionale',
  intro: 'Un percorso di eccellenza nella chirurgia plastica ed estetica',
  list: [
    { period: '1990-Oggi', role: 'Chirurgo plastico libero professionista' },
    { period: '1996-2013', role: 'Gestione ambulatorio chirurgia plastica di Ovada' },
    { period: '2011-2017', role: 'Dirigente dermatologia plastica oncologica' },
    { period: '2000-2010', role: 'Dirigente chirurgia della cute e degli annessi' },
    { period: '1996-2017', role: 'Gestione Ambulatorio chirurgia plastica di Acqui Terme' },
    { period: '1990-1995', role: 'Assistente di Chirurgia Generale' },
    { period: '1986-1989', role: 'Servizio di volontariato civile in Kenya' },
    { period: '1980-1985', role: 'Specializzando' },
  ],
} as const;

export interface Location extends Contact {
  /** Identificatore stabile (ancore e dati strutturati) */
  id: string;
  /** Link diretto alla scheda Google Maps (dati strutturati e llms.txt) */
  mapUrl: string;
}

/** Sedi: ogni struttura ha recapiti e link alle mappe nella stessa scheda. */
export const locations = {
  kicker: 'Dove Trovarci',
  title: 'Dove Trovarci',
  intro: 'Le nostre sedi',
  list: [
    {
      id: 'centro-medico-75',
      name: 'Centro Medico 75°',
      phones: [{ display: '0144 57911', tel: '+39014457911' }],
      mapUrl: 'https://maps.google.com/?cid=13493323120771463358',
    },
    {
      id: 'habilita-villa-igea',
      name: 'Habilita Villa Igea',
      phones: [{ display: '0144 310812', tel: '+390144310812' }],
      mapUrl: 'https://maps.google.com/?cid=1500165005217201025',
    },
    {
      id: 'manus-medica',
      name: 'Manus Medica',
      phones: [
        { display: '0144 090131', tel: '+390144090131' },
        { display: '376 204 4760', tel: '+393762044760' },
      ],
      mapUrl: 'https://maps.google.com/?cid=2553489803279153652',
    },
  ] satisfies Location[],
};

export const reviews = {
  kicker: 'Recensioni',
  title: 'Recensioni',
  lead: 'La tua opinione è importante per noi',
  text: "Se hai avuto un'esperienza con il Dottor Forlani, ti invitiamo a condividere la tua opinione.",
  cta: { href: site.reviewUrl, label: 'Lascia una Recensione' },
} as const;

export const mobileCta = { href: '#contatti', label: 'Contattami' } as const;

/**
 * Dati del professionista (partita IVA: art. 35 DPR 633/72) e del titolare
 * del trattamento (GDPR, art. 13). I campi `null` vanno completati: finché ne
 * resta uno obbligatorio, `npm run build` si interrompe (vedi Footer.astro).
 */
export const legal = {
  owner: site.name,
  vatNumber: '02554280061' as string | null,
  email: 'drforlani.work@gmail.com' as string | null,
  /** Facoltativa: se vuota non viene mostrata */
  pec: null as string | null,
};

/** Cosa inserire in ogni campo: mostrato nel segnaposto finché il campo è vuoto */
export const legalHints = {
  vatNumber: 'partita IVA del Dr. Forlani (11 cifre)',
  email: "indirizzo email a cui scrivere per le richieste sulla privacy",
} as const;

export const missingLegal = (Object.keys(legalHints) as (keyof typeof legalHints)[]).filter(
  (key) => !legal[key],
);

/** Informativa privacy e cookie (GDPR, art. 13; Linee guida cookie del Garante, 10/06/2021) */
export const privacy = {
  id: 'privacy',
  title: 'Informativa privacy e cookie',
  updated: '17 settembre 2026',
  googlePrivacyUrl: 'https://policies.google.com/privacy',
  garanteUrl: 'https://www.garanteprivacy.it/',
};
