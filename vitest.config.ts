import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@lateral/design-system': path.resolve(__dirname, './packages/design-system/src')
    }
  }
})