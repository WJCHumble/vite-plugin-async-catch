import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import AsyncCatch from 'vite-plugin-async-catch'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), AsyncCatch({
    catchCode: 'console.error(e)',
  })],
})
