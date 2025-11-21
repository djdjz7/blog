import { PluginOption } from 'vite'
import fg from 'fast-glob'
import matter from 'gray-matter'
import type { PageData } from '../src/data/pagedata'
import { RouteTitleRecord, SiteConfiguration } from '../src/site'
import { existsSync, readFileSync } from 'fs'
import yaml from 'js-yaml'

export function generatePages(): PageData[] {
  return fg
    .sync(`./content/**/*.(md|vue)`)
    .map((entry) => {
      if (entry.endsWith('.md')) {
        return { entry, frontmatter: matter.read(entry, { excerpt: true }) }
      }
      const yamlCandidates = [`${entry}.yaml`, `${entry}.yml`]
      for (const candidate of yamlCandidates) {
        if (existsSync(candidate)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const frontmatterData = yaml.load(readFileSync(candidate, 'utf8')) as any
          const excerpt = frontmatterData.excerpt as string | undefined
          delete frontmatterData.excerpt
          return { entry, frontmatter: { data: frontmatterData, excerpt } }
        }
      }
      return { entry, frontmatter: undefined }
    })
    .map(({ entry, frontmatter }): PageData | undefined => {
      if (!frontmatter) return undefined
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
      const noExerpt = data.noExcerpt || false
      const lang = data.lang || SiteConfiguration.defaultLang
      delete data.time
      delete data.title
      delete data.meta
      delete data.slug
      delete data.tags
      delete data.noExcerpt
      delete data.lang
      return {
        title,
        time,
        data,
        meta,
        category,
        excerpt: noExerpt ? undefined : frontmatter.excerpt,
        contentUrl: `${slug}`,
        sourceUrl: entryToRoot,
        tags,
        lang,
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
