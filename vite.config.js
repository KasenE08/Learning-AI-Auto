import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import pkg from './package.json' with { type: 'json' };

// GitHub Pages serves the repo at /<repo-name>/ (case-sensitive).
const BASE = '/Learning-AI-Auto/';

export default defineConfig({
  base: BASE,
  build: { target: 'es2020' },
  define: { __APP_VERSION__: JSON.stringify(process.env.APP_VERSION || pkg.version) },
  plugins: [
    VitePWA({
      registerType: 'prompt',
      injectRegister: false, // registered manually in src/core/sw.js
      includeAssets: ['favicon.png', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'Learning AI Auto',
        short_name: 'AI Auto',
        description: 'Learn to start, run, and scale a one-person AI automation business. No code, no accounts.',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        orientation: 'any',
        background_color: '#f3f7fc',
        theme_color: '#f3f7fc',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,json}'],
        navigateFallback: `${BASE}index.html`,
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  test: { environment: 'node', include: ['tests/**/*.test.js'] },
});
