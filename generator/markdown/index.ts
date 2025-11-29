import MarkdownIt, * as mdit from 'markdown-it'
import Token from 'markdown-it/lib/token.mjs'
import { SiteConfiguration } from '../../src/site'
import Shiki from '@shikijs/markdown-it'
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerRemoveNotationEscape,
} from '@shikijs/transformers'
import { MarkdownItTexOptions, tex } from '@mdit/plugin-tex'
// @ts-expect-error: MathJax typing issues
import MathJax from 'mathjax'
import MarkdownItContainer from 'markdown-it-container'
import { componentPlugin } from '@mdit-vue/plugin-component'
import { MarkdownSfcBlocks, sfcPlugin } from '@mdit-vue/plugin-sfc'
import { headersPlugin, MarkdownItHeader } from '@mdit-vue/plugin-headers'
import MarkdownItFootnote from 'markdown-it-footnote'
import ImageProcessor from './image-processor'
import anchor from 'markdown-it-anchor'
import { imgLazyload } from '@mdit/plugin-img-lazyload'
import heimu from './heimu'
import { randomUUID } from 'crypto'

await MathJax.init({
  loader: { load: ['input/tex', 'input/asciimath', 'output/svg', 'a11y/assistive-mml'] },
  svg: { fontCache: 'local' },
  options: {
    enableAssistiveMml: true,
  },
})

export async function registerMarkdownPlugins(mdit: MarkdownIt) {
  mdit
    .use(MarkdownItFootnote)
    .use(ImageProcessor)
    .use(tex, {
      render(
        content,
        displayMode,
        env: { mathPromises?: Record<string, Promise<any>>; mathjax?: any },
      ) {
        if (!env.mathPromises) {
          env.mathPromises = {}
        }
        const uuid = `<!-- math-${randomUUID()} -->`

        env.mathPromises[uuid] = MathJax.tex2svgPromise(content, {
          display: displayMode,
        })
        env.mathjax = MathJax
        return uuid
      },
    } as MarkdownItTexOptions)
    .use(heimu)
    .use(anchor, {
      permalink: anchor.permalink.ariaHidden({
        placement: 'before',
        class: 'header-anchor',
      }),
    })
    .use(createContainer, 'warning', SiteConfiguration.markdown.container.warningLabel || 'WARNING')
    .use(createContainer, 'error', SiteConfiguration.markdown.container.errorLabel || 'ERROR')
    .use(createContainer, 'info', SiteConfiguration.markdown.container.infoLabel || 'INFO')
    .use(MarkdownItContainer, 'expander', {
      render: (tokens: Token[], idx: number) => {
        if (tokens[idx].nesting === 1) {
          return `
<ExpanderComponent class="expander" :initial-collapsed="true"
  :extend-toggle-area="true">
  <template #header>
    <span font-bold text-sm p-y-4>${extractExpanderTitle(tokens[idx].info)}</span>
  </template>\n`
        } else {
          return '</ExpanderComponent>\n'
        }
      },
    })
    .use(
      await Shiki({
        themes: {
          light: 'catppuccin-latte',
          dark: 'one-dark-pro',
        },
        transformers: [
          transformerNotationDiff(),
          transformerNotationFocus(),
          transformerNotationHighlight(),
          transformerRemoveNotationEscape(),
        ],
      }),
    )
    .use(componentPlugin)
    .use(sfcPlugin)
    .use(headersPlugin)
    .use(imgLazyload)
}

export function injectHeaderData(headers: MarkdownItHeader[], sfcBlocks: MarkdownSfcBlocks) {
  const headerData = JSON.stringify(flattenHeaders(headers))
  const code = `export const __headers = ${headerData}`
  const useTypescript = sfcBlocks.scriptSetup
    ? sfcBlocks.scriptSetup.tagOpen.includes(`lang="ts"`)
    : false
  if (!sfcBlocks.script) {
    sfcBlocks.script = {
      type: 'script',
      content: `<script ${useTypescript ? 'lang="ts"' : ''}>${code}</script>`,
      contentStripped: code,
      tagOpen: `<script ${useTypescript ? 'lang="ts"' : ''}>`,
      tagClose: '</script>',
    }
  } else {
    sfcBlocks.script.contentStripped = code + sfcBlocks.script.contentStripped
    sfcBlocks.script.content =
      sfcBlocks.script.tagOpen + sfcBlocks.script.contentStripped + sfcBlocks.script.tagClose
  }
}

export function injectSetupCode(code: string, sfcBlocks: MarkdownSfcBlocks) {
  const useTypescript = sfcBlocks.scriptSetup
    ? sfcBlocks.scriptSetup.tagOpen.includes(`lang="ts"`)
    : false
  if (!sfcBlocks.scriptSetup) {
    sfcBlocks.scriptSetup = {
      type: 'scriptSetup',
      content: `<script setup ${useTypescript ? 'lang="ts"' : ''}>${code}</script>`,
      contentStripped: code,
      tagOpen: `<script setup ${useTypescript ? 'lang="ts"' : ''}>`,
      tagClose: '</script>',
    }
  } else {
    sfcBlocks.scriptSetup.contentStripped = code + '\n' + sfcBlocks.scriptSetup.contentStripped
    sfcBlocks.scriptSetup.content =
      sfcBlocks.scriptSetup.tagOpen +
      sfcBlocks.scriptSetup.contentStripped +
      sfcBlocks.scriptSetup.tagClose
  }
}

function flattenHeaders(headers: MarkdownItHeader[]): MarkdownItHeader[] {
  return headers.flatMap((header) => {
    if (header.children) {
      return [header, ...flattenHeaders(header.children)]
    } else {
      return [header]
    }
  })
}

function extractExpanderTitle(info: string) {
  const re = /^ *expander *(.*?)$/
  const result = info.replace(re, '$1').trim()
  if (result) return result
  else return SiteConfiguration.markdown.container.expanderLabel ?? 'MORE'
}

function extractContainerTitle(info: string, klass: string) {
  const re = new RegExp(`^ *${klass.trim()} *(.*?)$`)
  const result = info.replace(re, '$1').trim()
  return result
}

function createContainer(md: MarkdownIt, klass: string, title: string) {
  MarkdownItContainer(md, klass, {
    render: (tokens: Token[], idx: number) => {
      return tokens[idx].nesting === 1
        ? `<div class="container ${klass}"><p class="container-title">${extractContainerTitle(tokens[idx].info, klass) || title}</p>\n`
        : '</div>\n'
    },
  })
}

const md = mdit.default({
  html: true,
  linkify: true,
  typographer: true,
})

registerMarkdownPlugins(md)

export { md }
