import { defineConfig } from 'vite'
import { resolve } from "path"
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';   //打包视图分析
import viteCompression from 'vite-plugin-compression';   //使用 gzip 或者 brotli 压缩
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      emitFile: false,
      filename: "stats.html", //分析图生成的文件名
      open: true //如果存在本地服务端口，将在打包后自动展示
    }),
    viteCompression({
      verbose: true, //是否在控制台输出压缩结果
      disable: false, //是否禁用,相当于开关在这里
      threshold: 10240, //体积大于 threshold 才会被压缩,单位 b，1b=8B, 1B=1024KB  那我们这里相当于 9kb多吧，就会压缩
      algorithm: 'gzip', //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz', //文件后缀
    })
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
        target: 'http://39.105.148.140:3030/api',   //本地
        // target: 'http://39.105.148.140:3030',   //线上
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }

})
