<script setup lang="ts">
import { useRoute } from '@/router/router'
import {
  computed,
  defineAsyncComponent,
  inject,
  onMounted,
  onUnmounted,
  ref,
  useSSRContext,
  useTemplateRef,
  watchEffect,
  watch,
} from 'vue'
// @ts-expect-error javascript import
import VueUtterances from 'vue-utterances'
import NotFoundView from '@/views/NotFoundView.vue'
import { useTitle } from '@vueuse/core'
import type { MarkdownItHeader } from '@mdit-vue/plugin-headers'
import {
  dateString,
  isIndexPage as testIndexPage,
  throttleAndDebounce,
  usePromiseResult,
} from '@/utils'
import PageListView from './PageListView.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import TopbarComponent from '@/components/TopbarComponent.vue'
import LoadingView from './LoadingView.vue'
import type { SSRContext } from 'vue/server-renderer'
import FooterComponent from '@/components/FooterComponent.vue'
import { SiteConfiguration } from '@/site'
import PageOutline from '@/components/PageOutline.vue'
import TagsView from './TagsView.vue'
import TagList from '@/components/TagList.vue'
import { ClientOnly } from '@/components/ClientOnly'
import { PageModulesInjectionKey, PageSplashesInjectionKey } from '@/injection'
import allPages from 'virtual:pages.json'
import type { PageData } from '@/data/pagedata'
import ErrorLoadingView from './ErrorLoadingView.vue'

let ssrContext: SSRContext | undefined
if (import.meta.env.SSR) ssrContext = useSSRContext()

const pageModules = inject(PageModulesInjectionKey)!
const pageSplashes = inject(PageSplashesInjectionKey)!
const route = useRoute(() => document.scrollingElement?.scrollTop)

type PageState = {
  data?: Partial<PageData>
  isIndex?: boolean
  Content: unknown
  outline?: import('vue').Ref<MarkdownItHeader[]> | undefined
  splash?: (() => Promise<{ default: string }>) | null | undefined
}

const page = computed<PageState>(() => {
  const prefix = '../content'
  const path = decodeURIComponent(route.path)
  const pathWithoutTrailingSplash = path.replace(/\/$/, '')
  const slugs = path.split('/').filter((slug) => slug)
  const page = (allPages as PageData[]).find((p) => p.contentUrl === path)
  const category = SiteConfiguration.getRouteCategoryTitle(slugs[0]!)
  const splash =
    pageSplashes[
      Object.keys(pageSplashes).find((key) =>
        key.startsWith(`${prefix}${pathWithoutTrailingSplash}/splash.`),
      ) ?? ''
    ]
  if (slugs[0] === 'tags') {
    return {
      data: {
        title: '标签',
      } as Partial<PageData>,
      isIndex: true,
      Content: TagsView,
      splash,
    }
  }
  if (testIndexPage(slugs)) {
    return {
      data: {
        title: category,
        category,
      } as Partial<PageData>,
      isIndex: true,
      Content: PageListView,
      splash,
    }
  }
  const module = (() => {
    if (page?.sourceUrl) return pageModules[prefix + page.sourceUrl]!()
    const pageModuleCandidates = [
      `${prefix}${pathWithoutTrailingSplash}.md`,
      `${prefix}${pathWithoutTrailingSplash}/index.md`,
      `${prefix}${pathWithoutTrailingSplash}.vue`,
      `${prefix}${pathWithoutTrailingSplash}/index.vue`,
    ]
    for (const candidate of pageModuleCandidates) {
      if (candidate in pageModules) {
        return pageModules[candidate]!()
      }
    }
    return undefined
  })()
  if (module) {
    const outline = usePromiseResult<MarkdownItHeader[]>(
      module.then((x) => x.__headers ?? []),
      [],
    )
    return {
      data: (page as Partial<PageData>) ?? undefined,
      Content: defineAsyncComponent({
        loader: () => module,
        loadingComponent: LoadingView,
        errorComponent: ErrorLoadingView,
        delay: 0,
      }),
      outline,
      splash,
    }
  }
  return {
    data: (page as Partial<PageData>) ?? undefined,
    Content: NotFoundView,
    outline: ref<MarkdownItHeader[]>([]),
    isIndex: false,
    splash,
  }
})

const pageSplash = ref('')
watchEffect(async () => {
  const loader = page.value.splash
  if (!loader) {
    pageSplash.value = ''
    return
  }
  try {
    pageSplash.value = ''
    const mod = await loader()
    pageSplash.value = mod.default
  } catch (e) {
    pageSplash.value = ''
  }
})

const title = useTitle(() => page.value.data?.title, {
  titleTemplate: `%s | ${SiteConfiguration.titleSuffix}`,
})

if (ssrContext) {
  const ctx: any = ssrContext
  ctx.titlePrefix = title.value
  const meta: { [key: string]: string } = page.value.data?.meta ?? {}
  meta.description = (meta.description ?? page.value.data?.excerpt ?? '').trim()
  ctx.meta = meta
  ctx.time = page.value.data?.time ?? ''
  ctx.author = (page.value.data?.data as any)?.author ?? ''
  ctx.sourceUrl = page.value.data?.sourceUrl ?? ''
}
const showTitle = ref(false)
const documentWrapper = useTemplateRef('document-wrapper')
const sidebarRef = useTemplateRef('sidebar-ref')
const highlightedSlug = ref('')
let headerElements: Element[] = []

onMounted(() => {
  window.scrollTo({ top: route.scrollTop, behavior: 'instant' })
  document.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll)
  document.documentElement.lang = SiteConfiguration.defaultLang
})

const handleScroll = throttleAndDebounce(() => {
  const scrollTop = document.scrollingElement?.scrollTop
  if (scrollTop == undefined) return
  if (scrollTop > 60) {
    showTitle.value = true
  } else {
    showTitle.value = false
  }
  if (!page.value.outline?.value?.length) return
  if (!documentWrapper.value) return
  if (!validateHeaderElements()) {
    headerElements = [
      ...(documentWrapper.value.querySelectorAll('h1, h2, h3, h4, h5, h6') ?? []),
    ].filter((x) => page.value.outline?.value?.some((y) => y.slug == x.id))
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
    highlightedSlug.value = page.value.outline.value.slice(-1)[0]!.slug
  }
}, 100)

function validateHeaderElements() {
  if (headerElements.length !== page.value.outline?.value?.length) return false
  for (let i = 0; i < headerElements.length; i++) {
    if (headerElements[i]!.id !== page.value.outline?.value?.[i]!.slug) return false
  }
  return true
}

watch(
  () => route.hash,
  (hash) => {
    const anchor = document.getElementById(hash.substring(1))
    if (anchor) window.scrollTo({ top: anchor.offsetTop - 40, behavior: 'smooth' })
  },
)

const handleDynamicComponentMounted = () => {
  const hash = route.hash
  const anchor = document.getElementById(hash.substring(1))
  if (anchor) window.scrollTo({ top: anchor.offsetTop - 40, behavior: 'smooth' })
  else window.scrollTo({ top: route.scrollTop, behavior: 'instant' })
}

const isDev = import.meta.env.DEV
</script>

<template>
  <div lg:grid class="lg:grid-cols-[auto_1fr_auto]" overflow-auto>
    <SidebarComponent ref="sidebar-ref" :current-title="page.data?.title" />
    <div overflow-auto box-border ref="document-wrapper">
      <div>
        <TopbarComponent
          :toggleSidebarFn="sidebarRef?.toggleSidebar"
          :title="page.data?.title ?? page.data?.category ?? ''"
          :show-title="showTitle" />
        <div v-if="page" m-b-8 m-x-auto relative>
          <Transition mode="out-in" name="slide-fade">
            <div :key="page.data?.title">
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
                    :stateful="false"
                    v-if="page.data?.tags"
                    :tags="page.data.tags"
                    class="text-shadow-none text-xs" />
                  <h1 m-y-2>{{ page.data?.title }}</h1>
                  <div m-t-2>
                    <span v-if="!page.isIndex">{{ dateString(page.data?.time) }}</span>
                    <span v-else>{{ page.data?.time }}</span>
                    <span v-for="key in Object.keys(page.data?.data ?? {})" :key="key">
                      <span m-x-1>·</span>
                      <span v-if="page.data?.data?.[key]">{{ page.data.data[key] }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <div class="max-w-840px m-x-auto box-border p-x-6 lg:p-x-12">
          <Transition mode="out-in" name="slide-fade">
            <component :is="page.Content" @vue:mounted="handleDynamicComponentMounted" />
          </Transition>
          <ClientOnly>
            <VueUtterances
              :key="route"
              v-if="!page.isIndex && !isDev"
              theme="preferred-color-scheme"
              repo="djdjz7/blog"
              class="m-t-12" />
          </ClientOnly>
          <FooterComponent p-y-12 />
        </div>
      </div>
    </div>
    <PageOutline
      hidden
      xl:block
      :page-outline="page.outline?.value"
      :highlighted-slug="highlightedSlug" />
  </div>
</template>

<style lang="css" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 400ms cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(16px);
  filter: blur(20px);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0px);
}
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-16px);
  filter: blur(20px);
}
</style>
