<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

withDefaults(
  defineProps<{
    fullscreen?: boolean
  }>(),
  {
    fullscreen: false,
  },
)

const tips = [
  '海内存知己，天涯若比邻',
  '剑阁峥嵘而崔嵬\n一夫当关，万夫莫开',
  '与君初相识，犹如故人归',
  '有朋自远方来，不亦乐乎',
  '千门万户曈曈日，总把新桃换旧符',
  '你知道吗，有六句话可能在这里出现\n这是第六句',
]

const tipIndex = ref(Math.floor(Math.random() * tips.length))
const tip = computed(() => tips[tipIndex.value])

let interval: number
onMounted(() => {
  interval = setInterval(
    () => {
      let nextIndex = Math.floor(Math.random() * tips.length)
      while (nextIndex === tipIndex.value) {
        nextIndex = Math.floor(Math.random() * tips.length)
      }
      tipIndex.value = nextIndex
    },
    3000,
    null,
  )
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div w-full m-t-12>
    <div
      m-x-auto
      flex="~ col items-center"
      :class="{ 'h-100dvh justify-center m-t--12': fullscreen }">
      <div rounded-full class="spinner" dark:to-white w-12 h-12 relative animate-spin></div>
      <h3 m-b-2>页面加载中</h3>
      <div flex="~ col items-center gap-1" text-center text-subtle>
        <Transition mode="out-in" name="slide-fade">
          <span :key="tip" whitespace-pre text-wrap>{{ tip }}</span>
        </Transition>
        <span>请坐和放宽</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spinner {
  mask-image: radial-gradient(transparent calc(1.5rem - 5px), black calc(1.5rem - 1px));
  background-image: conic-gradient(transparent 25%, black 100%);
}

@media (prefers-color-scheme: dark) {
  .spinner {
    background-image: conic-gradient(transparent 25%, white 100%);
  }
}
</style>
