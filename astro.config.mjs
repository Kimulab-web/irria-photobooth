import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://irria-photobooth.fr',
  output: 'static',
  adapter: vercel(),
  integrations: [mdx(), sitemap()],
  trailingSlash: 'always',
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    },
  },
});
