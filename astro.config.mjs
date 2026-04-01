// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://www.thetrademarkhoop.com',
  output: 'server',
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      serialize(item) {
        if (item.url !== 'https://www.thetrademarkhoop.com/' && !item.url.endsWith('.html')) {
          item.url = item.url.replace(/\/$/, '') + '.html';
        }
        return item;
      },
    }),
  ],
});
