import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        contentScript: resolve(__dirname, 'src/contentScript.tsx'),
      },
      output: {
        format: 'iife',
        entryFileNames: '[name].js',
        dir: 'dist/content',
      },
    },
  },
})
