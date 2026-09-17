/**
 * Dati strutturati schema.org (JSON-LD) generati dai contenuti del sito,
 * così SEO/GEO restano sempre allineati a ciò che l'utente vede.
 */
import { about, career, contacts, legal, locations, services, site, type Phone } from './site';

const id = (fragment: string) => `${site.url}#${fragment}`;

const toIntl = (tel: string) => tel.replace(/^\+39/, '+39 ');
const phones = (list: readonly Phone[]) =>
  list.length === 1 ? toIntl(list[0].tel) : list.map((p) => toIntl(p.tel));

/**
 * Dati delle strutture usati SOLO nei dati strutturati (non mostrati in pagina).
 * Inserire esclusivamente informazioni verificate.
 * Indirizzi confermati dal committente (2026-09-17); Habilita e Manus Medica
 * coincidono anche con i rispettivi siti ufficiali.
 */
export const placeDetails: Record<string, { streetAddress: string; url?: string }> = {
  'centro-medico-75': {
    streetAddress: 'Via Aureliano Galeazzo, 33',
  },
  'habilita-villa-igea': {
    streetAddress: 'Strada Moirano, 2',
    url: 'https://habilita.it/sedi/habilita-villa-igea-acqui-terme/',
  },
  'manus-medica': {
    streetAddress: 'Corso Bagni, 177c/177d',
    url: 'https://www.manusmedica.it/',
  },
};

export function buildSchema(imageUrl: string, socialImage: { url: string; width: number; height: number }) {
  const places = locations.list.map((location) => {
    const details: { streetAddress?: string; url?: string } = placeDetails[location.id] ?? {};
    return {
      '@type': 'MedicalClinic',
      '@id': id(location.id),
      name: location.name,
      url: details.url,
      hasMap: location.mapUrl,
      telephone: phones(location.phones),
      address: {
        '@type': 'PostalAddress',
        streetAddress: details.streetAddress,
        postalCode: details.streetAddress ? site.postalCode : undefined,
        addressLocality: site.city,
        addressRegion: 'AL',
        addressCountry: 'IT',
      },
      areaServed: { '@type': 'City', name: site.city },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: phones(location.phones),
        contactType: contacts.intro,
        availableLanguage: 'it',
      },
    };
  });

  const physician = { '@id': id('physician') };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': id('website'),
        url: site.url,
        name: site.name,
        inLanguage: 'it-IT',
        publisher: physician,
      },
      {
        '@type': 'WebPage',
        '@id': id('webpage'),
        url: site.url,
        name: site.title,
        description: site.description,
        isPartOf: { '@id': id('website') },
        about: physician,
        mainEntity: physician,
        primaryImageOfPage: { '@id': id('ritratto') },
        image: { '@id': id('immagine-social') },
        inLanguage: 'it-IT',
        dateModified: site.lastModified,
        hasPart: services.list.map((s) => ({ '@id': id(s.id) })),
      },
      {
        '@type': 'ImageObject',
        '@id': id('ritratto'),
        url: imageUrl,
        contentUrl: imageUrl,
        caption: 'Dottor Stefano Forlani',
      },
      {
        '@type': 'ImageObject',
        '@id': id('immagine-social'),
        url: socialImage.url,
        contentUrl: socialImage.url,
        width: socialImage.width,
        height: socialImage.height,
        caption: site.shareTitle,
      },
      {
        // IndividualPhysician (schema.org 26+) per il singolo medico; Person per i dati anagrafici
        '@type': ['Person', 'IndividualPhysician'],
        '@id': physician['@id'],
        name: site.name,
        alternateName: [site.shortName, 'Dottor Stefano Forlani', 'Stefano Forlani'],
        givenName: 'Stefano',
        familyName: 'Forlani',
        honorificPrefix: 'Dr.',
        vatID: legal.vatNumber ?? undefined,
        email: legal.email ?? undefined,
        jobTitle: 'Chirurgo Plastico',
        url: site.url,
        mainEntityOfPage: { '@id': id('webpage') },
        image: { '@id': id('ritratto') },
        description: site.description,
        disambiguatingDescription: site.tagline,
        medicalSpecialty: 'https://schema.org/PlasticSurgery',
        areaServed: { '@type': 'City', name: site.city },
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.city,
          addressRegion: 'AL',
          addressCountry: 'IT',
        },
        telephone: phones(contacts.personal.phones),
        knowsLanguage: [
          { '@type': 'Language', name: 'Italiano', alternateName: 'it' },
          ...about.languages.map((l) => ({
            '@type': 'Language',
            name: l.name,
            alternateName: l.code,
          })),
        ],
        knowsAbout: services.list.flatMap((s) => [s.title, ...s.items]),
        hasCredential: about.panels
          .find((p) => p.title.startsWith('Formazione'))
          ?.items.filter((i) => /^(Laurea|Specializzazione)/.test(i))
          .map((name) => ({
            '@type': 'EducationalOccupationalCredential',
            name,
          })),
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Chirurgo plastico',
          occupationLocation: { '@type': 'City', name: site.city },
          description: career.list.map((c) => `${c.period}: ${c.role}`).join('; '),
        },
        practicesAt: places.map((p) => ({ '@id': p['@id'] })),
        workLocation: places.map((p) => ({ '@id': p['@id'] })),
        availableService: services.list.map((s) => ({
          '@type': 'MedicalProcedure',
          '@id': id(s.id),
          name: s.title,
          url: id(s.id),
          description: s.items.join(', '),
        })),
        contactPoint: [contacts.personal, ...locations.list].map((c) => ({
          '@type': 'ContactPoint',
          name: c.name,
          telephone: phones(c.phones),
          contactType: contacts.intro,
          availableLanguage: 'it',
        })),
      },
      ...places,
    ],
  };
}
