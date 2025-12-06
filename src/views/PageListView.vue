<script setup lang="ts">
import PageListEntry from '@/components/PageListEntry.vue'
import { useRoute } from '@/router/router'
import { groupByYearMonth, pageEntryCompare } from '@/utils'
import allPages from 'virtual:pages.json'
import { isIndexPage } from '@/utils'
import { computed } from 'vue'

const route = useRoute(() => undefined)
const base = computed(() => {
  const path = route.path
  const pathname = new URL(path, 'http://localhost').pathname
  const urlSlugs = pathname.split('/').filter((slug) => slug)
  let base: string | null = null
  if (isIndexPage(urlSlugs)) base = urlSlugs[0]!
  return base
})

const pageGroups = computed(() => {
  const pages = allPages.filter((page) => page.category === base.value).sort(pageEntryCompare)
  return groupByYearMonth(pages)
})
</script>

<template>
  <Transition name="slide-fade" mode="out-in">
    <div p-t-6 :key="base || 'EMPTY_BASE'">
      <div flex="~ col gap-10">
        <div relative v-for="pageGroup in pageGroups" :key="pageGroup.year + '-' + pageGroup.month">
          <h2
            m-0
            text-stroke-1
            text-5xl
            font-bold
            text-stroke-gray-300
            dark:text-stroke-truegray-600
            dark:text-stroke-1.5
            m-b-2
            text-right
            absolute
            right-0
            class="-top-12"
            text-transparent
            select-none
            tracking-wide>
            {{ pageGroup.year }}<br />
            {{ pageGroup.month.toString().padStart(2, '0') }}
          </h2>
          <PageListEntry
            v-for="activity in pageGroup.items"
            :page-entry="activity"
            :key="activity.title" />
        </div>
      </div></div
  ></Transition>
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
