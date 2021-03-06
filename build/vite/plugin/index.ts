import type { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unocss from 'unocss/vite'

import { configHtmlPlugin } from './html'
import { configIconsPlugin } from './icons'
import { configCompressionPlugin } from './compress'
import { configImageminPlugin } from './imagemin'

export function createVitePlugins(env: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()]

  // unocss
  vitePlugins.push(unocss())

  // icons
  vitePlugins.push(configIconsPlugin(isBuild))

  // html
  vitePlugins.push(configHtmlPlugin(env, isBuild))

  // The following plugins only work in the production environment
  if (isBuild) {
    // gzip
    vitePlugins.push(configCompressionPlugin('gzip', false))

    // imagemin
    vitePlugins.push(configImageminPlugin())
  }

  return vitePlugins
}
