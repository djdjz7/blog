<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/solid'
withDefaults(
  defineProps<{
    name: string
    price: number
    currency?: string
    imageUrl: string
    stars: number
    type: string
  }>(),
  {
    currency: '¥',
  },
)
</script>

<template>
  <div
    grid
    gap-2
    class="grid-cols-[2fr_1fr] bg-gray-100/20 dark:bg-truegray-700/20"
    border="solid 1 gray-200 dark:truegray-700"
    p-4
    m-y-2
    max-h-35
    rounded-xl
    relative
    overflow-hidden>
    <div>
      <span block text-xl>{{ name }}</span>
      <div flex="~ gap-2 items-baseline" text-subtle>
        <span>{{ currency }}{{ price }}</span>
        <span>·</span>
        <span>{{ type }}</span>
      </div>
      <div m-t-2>
        <slot />
      </div>
    </div>
    <div absolute bottom--2 left--1 flex="~ items-center gap-1" z-100>
      <template v-for="n in 5" :key="n">
        <div v-if="n === Math.ceil(stars) && n !== stars" w-10 h-10 rotate-340 relative>
          <div
            absolute
            top-0
            right-0
            h-full
            overflow-hidden
            :style="{ width: `${(1 - stars + Math.floor(stars)) * 100}%` }">
            <StarIcon
              class="block h-full absolute right-0 color-gray-300/40 dark:color-truegray-600/40" />
          </div>
          <div
            absolute
            top-0
            left-0
            h-full
            overflow-hidden
            :style="{ width: `${(stars - Math.floor(stars)) * 100}%` }">
            <StarIcon class="h-full color-amber-400/40" />
          </div>
        </div>
        <StarIcon
          v-else
          :class="{
            'color-amber-400/40': n <= stars,
            'color-gray-300/40 dark:color-truegray-600/40': n > stars,
          }"
          class="w-10 h-10 rotate-340" />
      </template>
    </div>
    <img
      block
      m--4
      class="w-[calc(100%_+_2rem)] h-[calc(100%_+_2rem)] max-w-unset cuisine-image"
      object-cover
      object-center-right
      loading="lazy"
      :src="imageUrl" />
  </div>
</template>

<style scoped>
.cuisine-image {
  mask: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 30%);
}
</style>
