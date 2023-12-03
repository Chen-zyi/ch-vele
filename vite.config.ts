import { type ConfigEnv, type UserConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Icons from 'unplugin-icons/vite'

export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      open: true,
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
        },
      },
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `
            @use "@/styles/variables.scss" as *;
          `,
        },
      },
    },
  }
}
