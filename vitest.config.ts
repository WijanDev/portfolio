
import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'

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
            exclude: ['node_modules', 'dist', '**/*.d.ts', '**/*.test.tsx', '**/*.config.*', '**/*.css', '**/*.svg', '**/routeTree.gen.ts'],
        },
    },
})
