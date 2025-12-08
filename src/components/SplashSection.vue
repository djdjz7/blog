<script setup lang="ts">
import type { PageData } from '@/data/pagedata'
import TagList from './TagList.vue'
import { onMounted, onUnmounted, ref, useTemplateRef, watchEffect } from 'vue'

const props = defineProps<{
  pageData?: Partial<PageData>
  splash?: (() => Promise<{ default: string }>) | null | undefined
}>()

const splashImage = ref<string | undefined>(undefined)

watchEffect(async () => {
  if (props.splash) {
    const result = await props.splash()
    splashImage.value = result.default
  } else {
    splashImage.value = undefined
  }
})

let observer: ResizeObserver | undefined = undefined
const textSectionWrapper = useTemplateRef('text-section-wrapper')
const textSectionHeight = ref(0)

onMounted(() => {
  observer = new ResizeObserver((entries) => {
    textSectionHeight.value = entries[0]!.contentRect.height
  })
  if (!textSectionWrapper.value) return
  observer.observe(textSectionWrapper.value)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div
    transition-height
    relative
    duration-500
    ease-fast-in
    :class="{ 'm-t-16 lg:m-t-12': !splashImage }"
    :style="{
      height: `${splashImage ? '26rem' : textSectionHeight + 'px'}`,
    }">
    <div
      relative
      transition-height
      duration-500
      ease-fast-in
      :class="[splashImage ? 'h-104' : 'h-0']">
      <img v-if="splashImage" h-full w-full object-cover :src="splashImage" />
      <div
        absolute
        top-0
        left-0
        right-0
        bottom-0
        backdrop-blur-3xl
        class="bg-black/40"
        v-if="splashImage"
        style="mask: linear-gradient(transparent, black 70%)"></div>
    </div>

    <div
      w-full
      max-w-840px
      m-auto
      p-x-6
      lg:p-x-12
      box-border
      transition-colors-500
      :class="{ 'text-white/85 text-shadow-sm': splashImage }">
      <div
        max-w-840px
        absolute
        :class="[splashImage ? 'bottom-6' : 'top-0']"
        ref="text-section-wrapper">
        <TagList
          :stateful="false"
          v-if="pageData?.tags"
          :tags="pageData.tags"
          class="text-shadow-none text-xs" />
        <h1 m-y-2 v-html="pageData?.title"></h1>
        <div m-t-2>
          <span>{{ pageData?.time }}</span>
          <span v-for="key in Object.keys(pageData?.data ?? {})" :key="key">
            <span m-x-1>·</span>
            <span v-if="pageData?.data?.[key]">{{ pageData.data[key] }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
