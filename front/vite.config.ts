import { defineConfig } from 'vite'
import { resolve } from "path"
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

  ],

  resolve: {
    alias: [
      {
        find: '@',                                   // 别名
        replacement: resolve(__dirname, 'src'),      // 别名对应地址
      },
    ]
  },
  server: {
    cors: true,
    open: true,
    proxy: {
      '/api': {
        // target: 'http://39.105.148.140:3030/api',   //本地
        target: 'http://39.105.148.140:3030',   //线上
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }

})
