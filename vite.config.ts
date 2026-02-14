import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
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
      minify: 'esbuild', // Es el más rápido y eficiente para Cloudflare
      sourcemap: false,  // Desactiva esto para reducir el peso de los assets en producción
      reportCompressedSize: false, // Acelera la build
      rollupOptions: {
        output: {
          // Esto ayuda a que el JS se divida en trozos más pequeños (Lazy loading)
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
    plugins: [
      // Solo incluimos devtools si el modo NO es production
      nitro(),
      mode !== 'production' && devtools(),
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tanstackStart(),
      viteReact(),
      tailwindcss(),
    ].filter(Boolean),
  }
})
