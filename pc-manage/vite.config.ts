import { defineConfig, loadEnv } from 'vite' // 新增：加载环境变量的方法
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VantResolver(), ElementPlusResolver()]
      }),
      Components({
        resolvers: [VantResolver(), ElementPlusResolver()]
      })
    ],
    base: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@api': path.resolve(__dirname, './src/api'),
        '@components': path.resolve(__dirname, './src/components'),
        '@store': path.resolve(__dirname, './src/store')
      }
    },
    server: {
      port: 8888,
      host: '0.0.0.0',
      open: true,
      // 代理配置
      proxy: {
        '/direct': {
          target: 'http://localhost:8092/ynrcc_admin',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/direct/, ''),
          withCredentials: true
        }
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      minify: 'esbuild',
      // 分包策略：拆分代码块，减小单个文件体积
      rollupOptions: {
        output: {
          // 静态资源分类打包
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          // 手动拆分依赖包（比如把vue、axios等第三方库单独打包）
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            utils: ['axios']
          }
        }
      }
    }
  }
})
