import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueSetupExtend()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./lib/style/index.scss";'
      }

    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'sview-ui': resolve(__dirname, './index.ts'),
    }
  }
})
