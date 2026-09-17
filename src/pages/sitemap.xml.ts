import type { APIRoute } from 'astro';
import { site } from '../data/site';

/** Sitemap senza dipendenze esterne: il sito è una singola pagina. */
export const GET: APIRoute = () => {
  const pages = [{ loc: site.url, lastmod: site.lastModified, changefreq: 'monthly', priority: '1.0' }];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) =>
      `  <url><loc>${p.loc}</loc><lastmod>${p.lastmod}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
