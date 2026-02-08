import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'node:url'
import { nitro } from 'nitro/vite'

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      },
    },
    build: {
      minify: 'esbuild',
      cssMinify: true,
      sourcemap: false,
    },
    plugins: [
      // Solo incluimos devtools si el modo NO es production
      mode !== 'production' && devtools(),
      nitro(),
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tanstackStart(),
      viteReact(),
    ].filter(Boolean),
  }
})
