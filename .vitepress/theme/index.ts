// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import PostEntry from './PostEntry.vue'
import Layout from './Layout.vue'
import './style.css'
import 'virtual:uno.css'

export default {
  extends: Theme,
  Layout: /*() => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },*/ Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('PostEntry', PostEntry)
  }
}
