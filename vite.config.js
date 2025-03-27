import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as dotenv from 'dotenv'
import vitEnv from 'vite-plugin-environment'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    vitEnv('all', { prefix: 'VITE_' })
  ],
 
})
