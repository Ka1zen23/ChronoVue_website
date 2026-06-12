import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  output: 'static',
  vite: {
    server: {
      proxy: {
        '/api': { target: 'http://localhost:3000', changeOrigin: true },
      },
    },
  },
});
