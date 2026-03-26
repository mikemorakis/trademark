// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.thetrademarkhoop.com',
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      serialize(item) {
        // Add .html extension to all URLs except the root
        if (item.url !== 'https://www.thetrademarkhoop.com/' && !item.url.endsWith('.html')) {
          item.url = item.url.replace(/\/$/, '') + '.html';
        }
        return item;
      },
    }),
  ],
});
