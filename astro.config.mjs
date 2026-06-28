// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://gyokuro06.github.io',
  base: '/sleepy-turtle',
  integrations: [react()]
});
