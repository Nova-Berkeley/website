// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Production URL. Keep this in sync with `site.url` in src/config.ts —
  // it drives canonical links, the sitemap, and Open Graph URLs.
  site: 'https://berkeleynova.org',
  integrations: [sitemap()],
});
