import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import AsyncCatch from 'vite-plugin-async-catch'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin(), AsyncCatch({
    catchCode: 'console.error(e)',
  })],
})
