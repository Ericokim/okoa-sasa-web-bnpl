import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression2'
import { tanstackRouter } from '@tanstack/router-vite-plugin'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        generatedRouteTree: './src/routeTree.gen.js',
        disableTypes: true,
      }),
      react(),
      tailwindcss(),
      compression({
        algorithm: 'brotliCompress',
        exclude: [/\.(br)$/, /\.(gz)$/],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      port: 3000,
      strictPort: true,
      cors: true,
    },
    build: {
      chunkSizeWarningLimit: 1000,
      commonjsOptions: {
        include: [/encrypt-storage/, /node_modules/],
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // Core React dependencies
            vendor: ['react', 'react-dom'],

            // TanStack ecosystem
            tanstack: [
              '@tanstack/react-router',
              '@tanstack/react-query',
              '@tanstack/react-table',
            ],

            // UI libraries
            ui: ['lucide-react', 'notistack'],

            // Form libraries
            forms: ['react-hook-form'],

            // Utility libraries
            utils: ['clsx', 'tailwind-merge'],
          },
        },
        onwarn(warning, defaultHandler) {
          if (warning.code === 'SOURCEMAP_ERROR') {
            return
          }
          defaultHandler(warning)
        },
      },
    },
    esbuild: {
      supported: {
        'top-level-await': true,
      },
    },
  }
})
