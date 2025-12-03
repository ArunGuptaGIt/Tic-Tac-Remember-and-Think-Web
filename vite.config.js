import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   base: "/tic-tac-remember-and-think-web/",
  plugins: [react()],
})
