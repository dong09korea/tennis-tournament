import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        react()
        /*VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [],
            manifest: {
                name: '테니스 대회 현황판',
                short_name: '테니스대회',
                description: '실시간 테니스 대회 진행 현황 및 점수 입력',
                theme_color: '#0a192f',
                background_color: '#0a192f',
                display: 'standalone',
                icons: []
            }
        })*/
    ],
    build: {
        outDir: 'dist'
    }
})
