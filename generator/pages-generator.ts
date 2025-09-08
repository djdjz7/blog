import { PluginOption } from 'vite'
import fg from 'fast-glob'
import matter from 'gray-matter'
import type { PageData } from '../src/data/pagedata'
import { RouteTitleRecord } from '../src/site'

export function generatePages() {
  return fg
    .sync(`./content/**/*.md`)
    .map((entry) => {
      return { entry, frontmatter: matter.read(entry, { excerpt: true }) }
    })
    .map((file): PageData | undefined => {
      const { entry, frontmatter } = file
      if (frontmatter.data.hidden) return undefined
      const entryToRoot = entry.replace(/^\.\/content/, '')
      const path = entryToRoot.replace(/index\.(?:md|vue)$/, '').replace(/\.(?:md|vue)/, '/')
      const slugs = path.split('/').filter((slug) => slug)
      const data = frontmatter.data
      const time = data.time
      const title = data.title
      const meta = data.meta
      const slug = data.slug || path
      const category = (slugs[0] in RouteTitleRecord && slugs[0]) || undefined
      const tags = data.tags
      delete data.time
      delete data.title
      delete data.meta
      delete data.slug
      delete data.tags
      return {
        title,
        time,
        data,
        meta,
        category,
        excerpt: frontmatter.excerpt,
        contentUrl: `${slug}`,
        sourceUrl: entryToRoot,
        tags,
      }
    })
    .filter((page) => page !== undefined)
}

export default function pagesGenerator(): PluginOption {
  const virtualModuleId = 'virtual:pages.json'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  return {
    name: 'pages-generator',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return JSON.stringify(generatePages())
      }
    },
    handleHotUpdate({ server, file }) {
      if (file.includes('content/')) {
        const thisModule = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
        if (thisModule) return [thisModule]
      }
    },
  }
}
