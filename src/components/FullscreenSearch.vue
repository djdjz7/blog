<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { refDebounced } from '@vueuse/core'
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'

let pagefind: any = null

const isShowing = ref(false)
const isLoadingBundle = ref(false)
const isSearching = ref(false)

const searchQueryRaw = ref('')
const searchQueryDebounced = refDebounced(searchQueryRaw, 300)

const result = ref<
  {
    url: string
    locations: number[]
    raw_url: string
    excerpt: string
    meta: {
      title: string
    }
  }[]
>([])
const pagefindBundleLoadError = ref<string | null>(null)
const inputRef = useTemplateRef('input-ref')

const show = async () => {
  isShowing.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
  if (!pagefind) {
    if (isLoadingBundle.value) return
    isLoadingBundle.value = true
    try {
      const pagefindBundle = '/pagefind' + '/pagefind.js'
      pagefind = await import(/* @vite-ignore */ pagefindBundle)
      isLoadingBundle.value = false
      pagefindBundleLoadError.value = null
    } catch (e) {
      isLoadingBundle.value = false
      pagefindBundleLoadError.value = `Failed to load Pagefind: ${e}`
      return
    }
  }
}
const hide = () => (isShowing.value = false)
const toggle = () => (isShowing.value ? hide() : show())

watch(searchQueryDebounced, async (newQuery, oldQuery) => {
  if (newQuery === oldQuery) return
  if (!pagefind) return
  isSearching.value = true
  const fullResult = await pagefind.search(newQuery)
  const firstFive = await Promise.all(fullResult.results.slice(0, 5).map((x: any) => x.data()))
  result.value = firstFive
  isSearching.value = false
})

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isShowing.value) {
      hide()
    }
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      toggle()
    }
  })
})

defineExpose({ show, hide, toggle })
</script>

<template>
  <div
    h-100dvh
    w-100dvw
    fixed
    top-0
    left-0
    backdrop-blur-xl
    z-100
    overscroll-contain
    @click="hide"
    v-if="isShowing">
    <div @click.stop w-150 m-t-20 m-x-auto bg-white dark:bg-truegray-800 p-2 rounded-xl shadow-xl>
      <div
        @click="inputRef?.focus()"
        flex
        gap-2
        p-2
        border="gray-200 dark:truegray-700 has-focus:primary"
        rounded-md
        border-solid>
        <MagnifyingGlassIcon class="w-6 color-gray-400 dark:color-truegray-500" />
        <input
          ref="input-ref"
          flex-1
          w-full
          box-border
          v-model="searchQueryRaw"
          placeholder="搜索..."
          dark:text-white
          placeholder-gray-400
          placeholder-font-400
          dark:placeholder-truegray-500
          text-lg
          outline-none
          bg-transparent
          transition-colors
          border-none />
      </div>

      <div v-if="result.length" m-t-2>
        <a
          p-2
          rounded-md
          block
          transition-colors
          duration-100
          v-for="entry in result"
          :key="entry.url"
          :href="entry.url"
          class="group"
          hover:bg-primary
          text-unset
          decoration-none
          @click="hide">
          <div>
            <span
              transition-colors
              duration-100
              text-primary
              text-lg
              block
              group-hover:color-white
              >{{ entry.meta.title }}</span
            >
            <span
              text-sm
              transition-colors
              duration-100
              text-gray-500
              dark:text-truegray-400
              group-hover:color-white
              v-html="entry.excerpt"></span>
          </div>
        </a>
      </div>
      <div text-sm text-center text-gray-500 dark:text-truegray-400>
        <div v-if="isLoadingBundle" m-t-2>正在加载搜索...</div>
        <div v-if="pagefindBundleLoadError" text-red m-t-2>{{ pagefindBundleLoadError }}</div>
        <div v-if="!result.length && searchQueryDebounced && !isSearching" m-t-2>展示空荡结果</div>
        <div v-if="isSearching" m-t-2>正在更新结果...</div>
      </div>
    </div>
  </div>
</template>
