import type { APIRoute } from 'astro';
import { about, career, contacts, locations, services, site } from '../data/site';
import { placeDetails } from '../data/schema';

/** llms.txt generato dagli stessi dati della pagina (GEO). */
export const GET: APIRoute = () => {
  const list = (items: readonly string[]) => items.map((i) => `- ${i}`).join('\n');

  const body = [
    `# ${site.name}`,
    '',
    `> ${site.tagline}. Chirurgia plastica, ricostruttiva ed estetica e medicina estetica ad ${site.city}.`,
    '',
    '## Servizi Offerti',
    '',
    ...services.list.flatMap((s) => [`### ${s.title}`, '', `${site.url}#${s.id}`, '', list(s.items), '']),
    '## Contatti e sedi',
    '',
    contacts.intro,
    '',
    ...locations.list.flatMap((l) => [
      `### ${l.name}`,
      '',
      list([
        `Indirizzo: ${placeDetails[l.id].streetAddress}, ${site.postalCode} ${site.city} (AL)`,
        `Telefono: ${l.phones.map((p) => p.display).join('; ')}`,
        `Mappa: ${l.mapUrl}`,
      ]),
      '',
    ]),
    `### ${contacts.personal.name}`,
    '',
    list([`Telefono: ${contacts.personal.phones.map((p) => p.display).join('; ')}`]),
    '',
    '## Chi Sono',
    '',
    about.story,
    '',
    ...about.panels.flatMap((p) => [`### ${p.title}`, '', list(p.items), '']),
    `### ${about.languagesTitle}`,
    '',
    list(about.languages.map((l) => `${l.name}: ${l.level}`)),
    '',
    '## Esperienza Professionale',
    '',
    list(career.list.map((c) => `${c.period}: ${c.role}`)),
    '',
    '## Fonte canonica',
    '',
    `- ${site.url}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
