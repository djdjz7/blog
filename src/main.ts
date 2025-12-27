import 'virtual:uno.css'
import '@/assets/base.css'
import '@/assets/codeblocks.css'
import '@/assets/containers.css'
import '@/assets/heimu.css'
import '@/assets/math-common.css'
import '@/assets/transitions.css'

import { createSSRApp, createApp as createSPAApp } from 'vue'
import App from './App.vue'
import { createRouter, RouterSymbol } from './router/router'
import ExpanderComponent from './components/ExpanderComponent.vue'
import BadgeComp from './components/BadgeComp.vue'
import GitHistory from './components/GitHistory.vue'
import { ClientOnly } from './components/ClientOnly'
import { PageModulesInjectionKey, PageSplashesInjectionKey } from './injection'
import type { Module } from './module'

const pageModules = {
  ...import.meta.glob('../content/**/*.md'),
  ...import.meta.glob('../content/**/*.vue'),
} as Record<string, () => Promise<Module>>

const pageSplashes = {
  ...import.meta.glob('../content/**/splash.*'),
  ...import.meta.glob('../content/**/splash-dark.*'),
} as Record<string, () => Promise<{ default: string }>>

export function createApp() {
  const app = import.meta.env.DEV ? createSPAApp(App) : createSSRApp(App)
  const router = createRouter()

  app.provide(RouterSymbol, router)
  app.provide(PageModulesInjectionKey, pageModules)
  app.provide(PageSplashesInjectionKey, pageSplashes)
  app.component('ExpanderComponent', ExpanderComponent)
  app.component('GitHistory', GitHistory)
  app.component('ClientOnly', ClientOnly)
  // eslint-disable-next-line vue/multi-word-component-names
  app.component('Badge', BadgeComp)
  return { app, router }
}
