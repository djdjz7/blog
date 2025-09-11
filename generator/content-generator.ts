import { PluginOption } from 'vite'
import matter from 'gray-matter'
import * as mdit from 'markdown-it'
import { injectHeaderData, injectSetupCode, registerMarkdownPlugins } from './markdown'
import { dirname } from 'path'
import { MarkdownSfcBlocks } from '@mdit-vue/plugin-sfc'
import { MarkdownItHeader } from '@mdit-vue/plugin-headers'
import { exec } from 'child_process'

const md = mdit.default({
  html: true,
  linkify: true,
  typographer: true,
})

registerMarkdownPlugins(md)

const preReplaceRe = /(<pre(?:(?!v-pre)[\s\S])*?)>/gm

const getGitBranch = async () => {
  return new Promise((resolve, reject) => {
    exec('git rev-parse --abbrev-ref HEAD', (error, stdout) => {
      if (error) {
        reject(error)
      } else {
        resolve(stdout.trim())
      }
    })
  })
}

const getGitHistory = async (filename: string): Promise<string> => {
  const branch = await getGitBranch()
  const process = exec(
    `git log --follow --pretty=format:'{<QUOTE>hash<QUOTE>:<QUOTE>%h<QUOTE>,<QUOTE>fullhash<QUOTE>:<QUOTE>%H<QUOTE>,<QUOTE>time<QUOTE>:<QUOTE>%cI<QUOTE>,<QUOTE>author<QUOTE>:<QUOTE>%an<QUOTE>,<QUOTE>message<QUOTE>:<QUOTE>%s<QUOTE>,<QUOTE>branch<QUOTE>:<QUOTE>${branch}<QUOTE>},' -- "${filename.replaceAll('"', '\\"')}"`,
  )
  let result = ''
  process.stdout?.on('data', (data) => {
    result += data
  })
  process.stderr?.on('data', (data) => {
    console.error(`Error: ${data}`)
  })
  await new Promise((resolve) => {
    process.on('close', resolve)
  })
  result = result.replaceAll('"', '\\"').replaceAll("'", "\\'").replaceAll('<QUOTE>', '"')
  return `[${result.trim().slice(0, -1)}]`
}

export default function markdownContentGenerator(): PluginOption {
  return {
    name: 'markdown-content-generator',
    enforce: 'pre',
    async transform(code, id) {
      if (id.endsWith('.md')) {
        const frontmatter = matter(code, { excerpt: true })
        const content = frontmatter.content
        const env: {
          mdRootPath: string
          sfcBlocks?: MarkdownSfcBlocks
          headers?: MarkdownItHeader[]
        } = { mdRootPath: dirname(id) }
        const gitHistory = await getGitHistory(id)

        md.render(content, env)
        const sfcBlocks = env.sfcBlocks!
        let templateContent = sfcBlocks.template?.contentStripped || ''
        templateContent =
          templateContent.replace(preReplaceRe, '$1 v-pre>') +
          '\n\n<hr>\n' +
          `<h2>文件历史</h2><GitHistory :history='__gitHistory' />`
        const headers = env.headers || []
        injectSetupCode('const __gitHistory = ' + gitHistory, sfcBlocks)
        injectHeaderData(headers, sfcBlocks)
        return `<template><div class="md-content ${encodeURIComponent(frontmatter.data.title)}">${templateContent}</div></template>${sfcBlocks.scriptSetup?.content}${sfcBlocks.script?.content || ''}${sfcBlocks.styles.map((x) => x.content) || ''}${sfcBlocks.customBlocks.map((x) => x.content).join('')}`
      }
    },
    handleHotUpdate({ server, file }) {
      if (file.includes('content/') && file.endsWith('.md')) {
        const thisModule = server.moduleGraph.getModuleById(file)
        if (thisModule) {
          server.reloadModule(thisModule)
          return []
        }
      }
    },
  }
}
