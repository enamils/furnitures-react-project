import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        // Include only test files in src/
        include: ['src/**/*.test.{ts,tsx}'],
        // Exclude E2E tests and other directories
        exclude: [
            'node_modules',
            'dist',
            'e2e',
            '**/*.spec.{ts,tsx}',
            'playwright-report',
            'test-results'
        ],
    },
});
