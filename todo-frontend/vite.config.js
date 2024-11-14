import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        port: 3000,
    },
    preview: {
        host: '0.0.0.0',
        port: 3000,
    },
    resolve: {
        alias: {
            '@': '/src/',
            '@api': '/src/api',
            '@components': '/src/components',
            '@store': '/src/store',
            '@hooks': '/src/hooks',
            '@pages': '/src/pages',
            '@styles': '/src/styles',
        }
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment'
    }
})
