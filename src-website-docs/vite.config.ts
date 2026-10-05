import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the production site from the repository subpath; local Vite uses `/`.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/RAN-Simulation-Documentation/' : '/',
}));
