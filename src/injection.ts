import type { InjectionKey } from 'vue'
import type { Module } from './module'

export const PageModulesInjectionKey = Symbol('Page modules') as InjectionKey<
  Record<string, () => Promise<Module>>
>

export const PageSplashesInjectionKey = Symbol('Page splashes') as InjectionKey<
  Record<string, () => Promise<{ default: string }>>
>
