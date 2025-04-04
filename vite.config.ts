import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mf_host',
      remotes: {
        mf_remote: {
          external: 'http://localhost:5001/assets/remoteEntry.js',
          externalType: 'url',
          from: 'vite',
        },
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});
