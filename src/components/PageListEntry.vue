<script setup lang="ts">
import type { PageData } from '@/data/pagedata'
import { dateString } from '@/utils'
import TagList from './TagList.vue'

defineProps<{
  pageEntry: PageData
}>()
</script>

<template>
  <div class="news-list-entry" p-y-4>
    <a :href="pageEntry.contentUrl" text-inherit no-underline
      ><h3 m-0>{{ pageEntry.title }}</h3></a
    >
    <div flex="~ items-center gap-1" m-t-1 text-gray-500 dark:text-truegray-400>
      <span>{{ dateString(pageEntry.time) }}</span>
      <span flex="~ gap-1" v-for="key in Object.keys(pageEntry.data)" :key="key">
        <span>·</span>
        <span v-if="pageEntry.data[key]">{{ pageEntry.data[key] }}</span>
      </span>
    </div>
    <p v-if="pageEntry.excerpt?.trim()" whitespace-pre text-wrap m-t-2 m-b-0>
      {{ pageEntry.excerpt.trim() }}
    </p>
    <a :href="pageEntry.contentUrl" underline-offset-4 m-b-2 m-t-2 inline-block w-auto
      >阅读全文...</a
    >
  </div>
</template>

<style scoped>
.news-list-entry:first-of-type {
  border-top: none;
}

.news-list-entry:last-of-type {
  padding-bottom: 0;
}
</style>
