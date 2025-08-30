<script setup lang="ts">
import { useRoute } from '@/router/router'
import {
  inject,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  useSSRContext,
  useTemplateRef,
  watch,
} from 'vue'
// @ts-expect-error javascript import
import VueUtterances from 'vue-utterances'
import type { PageData } from '@/data/pagedata'
import allPages from 'virtual:pages.json'
import NotFoundView from '@/views/NotFoundView.vue'
import type { Module } from '@/module'
import { useTitle } from '@vueuse/core'
import {
  dateString,
  isIndexPage as testIndexPage,
  throttleAndDebounce,
  waitForAppearance,
} from '@/utils'
import PageListView from './PageListView.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import TopbarComponent from '@/components/TopbarComponent.vue'
import LoadingView from './LoadingView.vue'
import type { SSRContext } from 'vue/server-renderer'
import FooterComponent from '@/components/FooterComponent.vue'
import { SiteConfiguration } from '@/site'
import type { MarkdownItHeader } from '@mdit-vue/plugin-headers'
import PageOutline from '@/components/PageOutline.vue'
import TagsView from './TagsView.vue'
import TagList from '@/components/TagList.vue'
import { ClientOnly } from '@/components/ClientOnly'

let ssrContext: SSRContext | undefined
if (import.meta.env.SSR) ssrContext = useSSRContext()

const pageModules = inject('pageModules') as Record<string, () => Promise<unknown>>
const pageSplashes = inject('pageSplashes') as Record<string, () => Promise<unknown>>
const route = useRoute(() => document.scrollingElement?.scrollTop)
const pathname = decodeURI(getPathname(route.path))
const pageCategory = ref(getPageCategory(pathname))
const { page, isIndexPage } = getCurrentPage(pathname)
const currentPage = shallowRef(page)
const isCurrentIndexPage = ref(isIndexPage)
const title = useTitle('', { titleTemplate: `%s | ${SiteConfiguration.titleSuffix}` })

title.value = currentPage.value?.title ? currentPage.value.title : pageCategory.value
if (ssrContext) {
  ssrContext.titlePrefix = title.value
  const meta: { [key: string]: string } = currentPage.value?.meta ?? {}
  meta.description = (meta.description ?? currentPage.value?.excerpt)?.trim()
  ssrContext.meta = meta
  ssrContext.time = currentPage.value?.time ?? ''
  ssrContext.author = currentPage.value?.data?.author ?? ''
  ssrContext.sourceUrl = currentPage.value?.sourceUrl ?? ''
}
const showTitle = ref(false)
const isLoading = ref(false)
const documentWrapper = useTemplateRef('document-wrapper')
const sidebarRef = useTemplateRef('sidebar-ref')
const pageSplash = ref<string>(
  ((await getSplash(currentPage.value?.sourceUrl || pathname)?.call(null)) as Module)?.default ??
    '',
)
const module = await resolvePageModule(currentPage.value?.sourceUrl || pathname)
const ContentRaw = shallowRef(module.default ?? module)
const pageOutlineData = ref<MarkdownItHeader[]>(module.__headers ?? [])
const highlightedSlug = ref('')
let headerElements: Element[] = []

watch(
  () => route.path,
  async (newVal, oldVal) => {
    const pathname = decodeURI(getPathname(newVal))
    const oldPathname = getPathname(oldVal)
    if (pathname === oldPathname) {
      const anchor = document.getElementById(getHash(newVal).substring(1))
      if (anchor) window.scrollTo({ top: anchor.offsetTop - 40, behavior: 'smooth' })
      return
    }
    const { page, isIndexPage } = getCurrentPage(pathname)
    currentPage.value = page
    isCurrentIndexPage.value = isIndexPage
    title.value = currentPage.value?.title ? currentPage.value.title : pageCategory.value
    isLoading.value = true
    pageOutlineData.value = []
    pageSplash.value =
      ((await getSplash(currentPage.value?.sourceUrl || pathname)?.call(null)) as Module)
        ?.default ?? ''
    const module = await resolvePageModule(currentPage.value?.sourceUrl || pathname)
    pageOutlineData.value = module.__headers ?? []
    ContentRaw.value = module.default ?? module
    isLoading.value = false
    if (!isIndexPage) {
      await waitForAppearance(`.${CSS.escape(page?.title ?? '')}`)
    }
    const anchor = document.getElementById(getHash(newVal).substring(1))
    if (anchor) window.scrollTo({ top: anchor.offsetTop - 40, behavior: 'smooth' })
    else window.scrollTo({ top: route.scrollTop, behavior: 'instant' })
  },
)

onMounted(() => {
  const anchor = document.getElementById(getHash(route.path).substring(1))
  if (anchor) window.scrollTo({ top: anchor.offsetTop - 40, behavior: 'smooth' })
  else window.scrollTo({ top: route.scrollTop, behavior: 'instant' })
  document.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll)
})

async function resolvePageModule(sourceOrPathname: string): Promise<Module | never> {
  const urlSlugs = sourceOrPathname.split('/').filter((slug) => slug)
  const indexPage = testIndexPage(urlSlugs)
  if (indexPage) {
    return PageListView as never
  }
  if (urlSlugs.length > 0 && urlSlugs[0] === 'tags') {
    return TagsView as never
  }
  if (sourceOrPathname.endsWith('/')) sourceOrPathname = sourceOrPathname.slice(0, -1)
  const modulePathCandidates = sourceOrPathname.endsWith('.md')
    ? ['../content' + sourceOrPathname]
    : [
        '../content' + sourceOrPathname + '.md',
        '../content' + sourceOrPathname + '/index.md',
        '../content' + sourceOrPathname + '.vue',
        '../content' + sourceOrPathname + '/index.vue',
      ]
  for (const modulePath of modulePathCandidates) {
    if (modulePath in pageModules) {
      const module = await (pageModules[modulePath]() as Promise<Module> | Module)
      return module
    }
  }
  return NotFoundView as never
}

const handleScroll = throttleAndDebounce(() => {
  const scrollTop = document.scrollingElement?.scrollTop
  if (scrollTop == undefined) return
  if (scrollTop > 60) {
    showTitle.value = true
  } else {
    showTitle.value = false
  }
  if (!pageOutlineData.value.length) return
  if (!documentWrapper.value) return
  if (!validateHeaderElements()) {
    headerElements = [
      ...(documentWrapper.value.querySelectorAll('h1, h2, h3, h4, h5, h6') ?? []),
    ].filter((x) => pageOutlineData.value.some((y) => y.slug == x.id))
  }
  const elements = headerElements
    .map((x) => {
      return {
        slug: x.id,
        top: x.getBoundingClientRect().top,
      }
    })
    .filter((x) => x.top < 80)
    .sort((a, b) => b.top - a.top)
  highlightedSlug.value = elements[0]?.slug ?? ''
  // if scrolled to bottom, highlight the last item
  if (Math.abs(scrollTop + window.innerHeight - documentWrapper.value.clientHeight) < 1) {
    highlightedSlug.value = pageOutlineData.value.slice(-1)[0].slug
  }
}, 100)

function getPathname(path: string) {
  return new URL(path, 'http://a.com').pathname
}

function getHash(path: string) {
  return new URL(path, 'http://a.com').hash
}

function getCurrentPage(pathname: string): { page: PageData | undefined; isIndexPage: boolean } {
  const urlSlugs = pathname.split('/').filter((slug) => slug)
  const indexPage = testIndexPage(urlSlugs)
  if (indexPage) {
    const pages =
      allPages
        .filter((page) => page.category === urlSlugs[0])
        .sort((a, b) => Date.parse(b.time) - Date.parse(a.time)) ?? []
    const first = pages[0]
    const last = pages[pages.length - 1]
    return {
      page: {
        contentUrl: '',
        title: SiteConfiguration.getRouteCategoryTitle(urlSlugs[0]),
        time:
          pages.length == 0
            ? ''
            : pages.length > 1
              ? `${dateString(last.time)} - ${dateString(first.time)}`
              : dateString(first.time),
        data: {},
        sourceUrl: '',
      },
      isIndexPage: true,
    }
  }

  if (urlSlugs[0] === 'tags') {
    return {
      page: {
        title: '标签',
        contentUrl: '/tags/',
        time: '#Forget about the price tag',
        data: {},
        sourceUrl: '',
      },
      isIndexPage: true,
    }
  }

  return {
    page: allPages.find((page) => page.contentUrl === pathname) || undefined,
    isIndexPage: false,
  }
}

function getPageCategory(pathname: string): string {
  const pageSegs = pathname.split('/')
  return SiteConfiguration.getRouteCategoryTitle(pageSegs[1]) ?? pageSegs[1]
}

function validateHeaderElements() {
  if (headerElements.length !== pageOutlineData.value.length) return false
  for (let i = 0; i < headerElements.length; i++) {
    if (headerElements[i].id !== pageOutlineData.value[i].slug) return false
  }
  return true
}

function getSplash(sourceOrPathname: string) {
  const splashImage = sourceOrPathname.endsWith('index.md')
    ? '../content' + sourceOrPathname.slice(0, -8) + 'splash.'
    : sourceOrPathname.endsWith('.md')
      ? '../content' + sourceOrPathname.slice(0, -3) + '/splash.'
      : '../content' + sourceOrPathname + '/splash.'
  for (const key in pageSplashes) {
    if (key.startsWith(splashImage)) {
      return pageSplashes[key]
    }
  }
  return null
}
</script>

<template>
  <div lg:grid class="lg:grid-cols-[auto_1fr_auto]" overflow-auto>
    <SidebarComponent ref="sidebar-ref" :current-title="currentPage?.title" />
    <div overflow-auto box-border ref="document-wrapper">
      <div>
        <TopbarComponent
          :toggleSidebarFn="sidebarRef?.toggleSidebar"
          :title="currentPage?.title ?? pageCategory"
          :show-title="showTitle" />
        <div v-if="currentPage" m-b-8 m-x-auto relative>
          <img w-full h-104 object-cover relative v-if="pageSplash" :src="pageSplash" />
          <div
            absolute
            top-0
            left-0
            right-0
            bottom-0
            backdrop-blur-3xl
            class="bg-black/40"
            style="mask: linear-gradient(transparent, black 70%)"
            v-if="pageSplash"></div>
          <div
            max-w-840px
            w-full
            m-auto
            p-x-6
            lg:p-x-12
            box-border
            :class="[pageSplash ? 'h-0 relative' : 'm-t-16 lg:m-t-12']">
            <div :class="[pageSplash ? 'text-white/85 text-shadow-sm absolute bottom-6' : '']">
              <TagList
                v-if="currentPage.tags"
                :tags="currentPage.tags"
                class="text-shadow-none text-xs" />
              <h1 m-y-2>{{ currentPage.title }}</h1>
              <div m-t-2>
                <span v-if="!isCurrentIndexPage">{{ dateString(currentPage.time) }}</span>
                <span v-else>{{ currentPage.time }}</span>
                <span v-for="key in Object.keys(currentPage.data)" :key="key">
                  <span m-x-1>·</span>
                  <span v-if="currentPage.data[key]">{{ currentPage.data[key] }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-840px m-x-auto box-border p-x-6 lg:p-x-12">
          <Transition mode="out-in">
            <LoadingView v-if="isLoading" />
            <component :is="ContentRaw" v-else-if="isCurrentIndexPage" />
            <div v-else>
              <component :is="ContentRaw" />
              <ClientOnly>
                <VueUtterances theme="preferred-color-scheme" repo="djdjz7/blog" class="m-t-12" />
              </ClientOnly>
            </div>
          </Transition>
          <FooterComponent p-y-12 />
        </div>
      </div>
    </div>
    <PageOutline
      hidden
      xl:block
      :page-outline="pageOutlineData"
      :highlighted-slug="highlightedSlug" />
  </div>
</template>

<style lang="css" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
