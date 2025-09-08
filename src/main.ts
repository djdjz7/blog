import 'virtual:uno.css'
import '@/assets/base.css'
import '@/assets/codeblocks.css'
import '@/assets/containers.css'
import '@/assets/heimu.css'

import { createSSRApp, createApp as createSPAApp } from 'vue'
import App from './App.vue'
import { createRouter, RouterSymbol } from './router/router'
import ExpanderComponent from './components/ExpanderComponent.vue'
import BadgeComp from './components/BadgeComp.vue'

const pageModules = {
  ...import.meta.glob('../content/**/*.md'),
  ...import.meta.glob('../content/**/*.vue'),
}

const pageSplashes = {
  ...import.meta.glob('../content/**/splash.*'),
  ...import.meta.glob('../content/**/splash-dark.*'),
}

export function createApp() {
  const app = import.meta.env.DEV ? createSPAApp(App) : createSSRApp(App)
  const router = createRouter()

  app.provide(RouterSymbol, router)
  app.provide('pageModules', pageModules)
  app.provide('pageSplashes', pageSplashes)
  app.component('ExpanderComponent', ExpanderComponent)
  // eslint-disable-next-line vue/multi-word-component-names
  app.component('Badge', BadgeComp)
  return { app, router }
}
