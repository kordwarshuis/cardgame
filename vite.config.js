import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      vue()
    ],
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: env.VITE_APP_TEMPLATE_CSS ? `@import "@/assets/css/template-base.scss";@import "@/assets/css/${env.VITE_APP_TEMPLATE_CSS}";` : '',
          api: 'modern-compiler'
        }
      }
    },
    
    server: {
      port: 8080,
      open: true
    },
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false
    },
    
    // Public directory for static assets
    publicDir: 'public',
    
    // Define global constants - make env vars available via import.meta.env
    define: {
      'process.env': JSON.stringify(env)
    }
  }
})
