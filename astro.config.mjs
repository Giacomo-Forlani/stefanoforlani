// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://stefanoforlani.com',
  trailingSlash: 'ignore',
  build: {
    // CSS piccolo: inline nella pagina per evitare una richiesta bloccante
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
