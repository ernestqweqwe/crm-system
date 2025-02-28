import * as path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        port: 3007,
    },
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
})
