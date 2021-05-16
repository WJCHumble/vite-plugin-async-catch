import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AsyncCatch from '../../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AsyncCatch({
    catchCode: `console.error(e)`,
  })],
})