import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
                name: 'Wimbledon Live',
                short_name: 'Wimbledon',
                description: 'Real-time Tennis Tournament Manager',
                theme_color: '#004E32',
                background_color: '#0d1f12',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                icons: [
                    {
                        src: 'icon.svg',
                        sizes: '192x192 512x512',
                        type: 'image/svg+xml'
                    }
                ]
            }
        })
    ],
    build: {
        outDir: 'dist_build'
    }
})
