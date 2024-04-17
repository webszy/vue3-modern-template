import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import {VueRouterAutoImports} from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'
import {analyzer} from 'vite-bundle-analyzer'
import type {PluginOption,resolveConfig,BuildOptions} from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/

export default defineConfig((mode)=>{
  const plugins:PluginOption[] = [
    UnoCSS(),
    AutoImport({
      dts: true,
      imports: [
        'vue',
        'pinia',
        VueRouterAutoImports,
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]}
      ],
      dirs:['src/stores']
    }),
    VueRouter(),
    vue(),
    vueJsx(),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    })
  ]
  const resolve:resolveConfig= {
    alias: {
      '@': '/src',
      '@stores': '/src/stores'
    }
  }
  const build:BuildOptions={
    outDir: 'dist',
    rollupOptions: {
      // input: '/src/main.ts',
      output: {
        entryFileNames: `js/[name]-[hash:8].js`,
        chunkFileNames: `js/[name]-[hash:8].js`,
        assetFileNames: `[ext]/[name]-[hash:8].[ext]`,
        manualChunks(id){
          if(id.includes('node_modules')){
            if(['vue','pinia','ofetch'].some(lib => id.includes(lib))){
              return 'basic'
            }
            if(id.includes('naive')){
              return 'naive-ui'
            }
             return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
  if(mode === 'production'){
    plugins.push(analyzer())
  }
  return {
    plugins,
    resolve,
    build
  }
})
