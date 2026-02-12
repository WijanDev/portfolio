
import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    plugins: [
        viteReact(),
        viteTsConfigPaths({
            projects: ['./tsconfig.json'],
        }),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            reporter: ['text', 'json', 'html', 'lcov'],
            provider: 'v8',
            include: ['src/**/*'],
            exclude: [
                'node_modules',
                'dist',
                '**/*.d.ts',
                '**/*.test.tsx',
                '**/*.config.*',
                '**/*.css',
                '**/*.svg',
                '**/routeTree.gen.ts',
                'vite.config.ts',
                'vitest.config.ts',
                '**/*.png'
            ],
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
        },
    },
})
