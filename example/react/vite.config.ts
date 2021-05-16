import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import AsyncCatch from '../../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), AsyncCatch()]
})
