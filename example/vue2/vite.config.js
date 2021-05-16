import { defineConfig } from 'vite'
import { createVuePlugin } from "vite-plugin-vue2"
import AsyncCatch from '../../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin(), AsyncCatch({
    catchCode: `console.log(e)`
  })],
})
