/// <reference types="vite/client" />

declare module 'virtual:pages.json' {
  import type { PageData } from '@/data/pagedata'
  declare const allPages: PageData[]
  export default allPages
}
