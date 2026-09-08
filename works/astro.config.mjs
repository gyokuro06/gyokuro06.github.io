// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

/** Local `astro dev` uses `/` so http://127.0.0.1:4321/ works. Production build keeps GitHub Pages base. */
const isBuild = process.argv.includes('build');

export default defineConfig({
  site: 'https://gyokuro06.github.io',
  base: isBuild ? '/works' : '/',
  integrations: [react()],
});
