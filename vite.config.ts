import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [preact(), tsconfigPaths()],
  build: {
    outDir: 'docs',
    // keep small project icons as lazy-loaded files instead of base64 in the bundle
    assetsInlineLimit: 0,
  },
})
