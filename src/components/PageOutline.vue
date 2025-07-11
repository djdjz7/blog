<script setup lang="ts">
import type { MarkdownItHeader } from '@mdit-vue/plugin-headers'
import { useTemplateRef, watch } from 'vue'

const props = defineProps<{
  pageOutline?: MarkdownItHeader[]
  highlightedSlug: string
}>()

const marker = useTemplateRef('marker')
const anchors = useTemplateRef<HTMLAnchorElement[]>('anchors')

watch(
  () => props.highlightedSlug,
  (newVal) => {
    if (!marker.value || !anchors.value) return
    if (!newVal) {
      marker.value.style.opacity = '0'
      marker.value.style.top = '0'
    } else {
      const target = anchors.value.find((anchor) => anchor.href.endsWith(`#${newVal}`))
      if (target) {
        marker.value.style.opacity = '1'
        marker.value.style.top = `${target.parentElement?.offsetTop}px`
      } else {
        marker.value.style.opacity = '0'
      }
    }
  },
)

watch(
  () => props.pageOutline,
  () => {
    if (!marker.value) return
    marker.value.style.opacity = '0'
    marker.value.style.top = '0'
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <nav
    :class="[pageOutline?.length ? 'w-64' : 'w-0 opacity-0']"
    class="transition-[width,opacity]"
    duration-300
    ease-in-out
    delay-150
    text-sm
    text-gray-500
    dark:text-truegray-400
  >
    <div fixed top-0 p-y-12 p-r-4 box-border w-64 h-full overflow-y-scroll overflow-x-clip>
      <div
        ref="marker"
        opacity-0
        absolute
        class="left-0"
        h-8
        w-2px
        bg-primary
        transition-all
        duration-150
      ></div>
      <span block font-bold tracking-widest text-xs m-l-1rem>本页目录</span>
      <ul p-l-0 m-b-0>
        <li
          overflow-hidden
          text-ellipsis
          text-nowrap
          w-full
          v-for="header in pageOutline"
          :key="header.slug"
          :style="{ marginLeft: `${(header.level - 1) * 1}rem` }"
        >
          <a
            :href="header.link"
            line-height-8
            color-inherit
            decoration-none
            ref="anchors"
            transition-all
            duration-150
            :class="{ 'text-primary! font-semibold': highlightedSlug === header.slug }"
          >
            {{ header.title }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
