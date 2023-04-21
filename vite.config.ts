import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      components: '/src/components',
      constants: '/src/constants',
      hooks: '/src/hooks',
      layouts: '/src/layouts',
      pages: '/src/pages',
      router: '/src/router',
      services: '/src/services',
      store: '/src/store',
      types: '/src/types',
      utils: '/src/utils',
    },
  },
  plugins: [react()],
});
