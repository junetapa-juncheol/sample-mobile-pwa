import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({base:'/sample-mobile-pwa/',plugins:[react()],build:{outDir:'docs',emptyOutDir:false,sourcemap:false},esbuild:{legalComments:'none'},test:{include:['tests/**/*.test.js']}});
