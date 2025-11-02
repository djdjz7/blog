<script setup lang="ts">
import { ref, type Component, watch, onMounted, type ComponentPublicInstance } from 'vue'
import allPages from 'virtual:pages.json'
import { groupByYearMonth } from '@/utils'
import ExpanderComponent from './ExpanderComponent.vue'
import { SiteConfiguration, RouteTitleRecord } from '@/site'
import type { PageData } from '@/data/pagedata'

const categories: {
  title: string
  route: string
  pageGroups: { year: number; month: number; items: PageData[] }[]
}[] = []

Object.keys(RouteTitleRecord).forEach((category) => {
  categories.push({
    title: SiteConfiguration.getRouteCategoryTitle(category),
    route: `/${category}/`,
    pageGroups: groupByYearMonth(
      allPages
        .filter((page) => page.category === category)
        .sort((a, b) => Date.parse(b.time) - Date.parse(a.time)),
    ),
  })
})
const sidebarCollapsed = ref(true)
const toggleSidebar = (collapse?: boolean) => {
  if (collapse === undefined) {
    sidebarCollapsed.value = !sidebarCollapsed.value
  } else {
    sidebarCollapsed.value = collapse
  }
}

const props = defineProps<{
  currentTitle: string | null | undefined
}>()

const entryElements = ref<Record<string, Element | null>>({})
watch(
  () => props.currentTitle,
  (newTitle) => {
    if (newTitle && entryElements.value[newTitle]) {
      scrollIntoViewIfNeeded(entryElements.value[newTitle])
    }
  },
)

onMounted(() => {
  if (!props.currentTitle) return
  if (!entryElements.value) return
  if (!entryElements.value[props.currentTitle]) return
  scrollIntoViewIfNeeded(entryElements.value[props.currentTitle]!)
})

defineExpose({ toggleSidebar })

const elementRefToElement = (ele: Element | ComponentPublicInstance | null) => {
  if (ele === null) return null
  if ('$el' in ele) {
    return ele.$el
  }
  return ele
}

const scrollIntoViewIfNeeded = (ele: Element) => {
  const rect = ele.getBoundingClientRect()
  if (!('scrollIntoView' in ele) || !rect) return
  if (rect.top < 0 || rect.bottom > window.innerHeight) {
    ele.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<template>
  <div lg:w-92 h-full>
    <div
      w-screen
      h-screen
      lg:w-92
      fixed
      h-full
      z-999
      duration-300
      @click="toggleSidebar(true)"
      pointer-events-none
      lg:pointer-events-unset
      class="h-100dvh! lg:backdrop-brightness-100!"
      :class="{ 'backdrop-brightness-40 pointer-events-unset': !sidebarCollapsed }">
      <div
        @click.stop
        h-full
        box-border
        p-x-6
        p-y-12
        md:p-x-12
        bg-gray-100
        dark:bg-dark-800
        lg:bg-transparent
        duration-300
        overflow-auto
        class="w-80% max-w-400px lg:w-unset lg:max-w-unset -translate-x-100% lg:translate-x-0"
        :class="{ 'translate-x-0! shadow-xl': !sidebarCollapsed }"
        lg:shadow-none>
        <a flex="~ items-center gap-2" href="/" class="text-unset! decoration-none">
          <span text-xl font-semibold>彩笔的部落阁</span>
        </a>

        <ExpanderComponent m-t-4 v-for="category in categories" :key="category.title">
          <template #header>
            <h3 m-0>
              <a
                :href="category.route"
                class="text-unset!"
                decoration-none
                @click="toggleSidebar(true)"
                >{{ category.title }}</a
              >
            </h3>
          </template>
          <div flex="~ col" box-border>
            <div
              v-for="pageGroup in category.pageGroups"
              :key="pageGroup.year + '-' + pageGroup.month"
              flex="~ col gap-2"
              class="group border-truegray-200/40 dark:border-dark-100/60"
              border-t-1
              border-t-solid
              p-y-3>
              <span text-xs text-gray-500 dark:text-truegray-400
                >{{ pageGroup.year }} 年 {{ pageGroup.month }} 月</span
              >
              <a
                v-for="page in pageGroup.items"
                @click="toggleSidebar(true)"
                :href="page.contentUrl"
                text-wrap
                :key="page.title"
                :ref="(el) => (entryElements[page.title] = elementRefToElement(el))"
                class="text-gray-500! dark:text-truegray-400! hover:text-gray-800! dark:hover:text-white! decoration-none"
                :class="{
                  'text-gray-800! dark:text-white! font-medium': currentTitle === page.title,
                }">
                {{ page.title }}</a
              >
            </div>
          </div>
        </ExpanderComponent>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group:first-of-type {
  --at-apply: border-t-0;
}

a {
  transition: color 0.2s;
}
</style>
