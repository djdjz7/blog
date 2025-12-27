<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(0)
const visible = ref(false)

let incrementalInterval: NodeJS.Timeout | null = null
let setZeroTimeout: NodeJS.Timeout | null = null

const start = () => {
  if (incrementalInterval) {
    clearInterval(incrementalInterval)
    incrementalInterval = null
  }
  if (setZeroTimeout) {
    clearTimeout(setZeroTimeout)
    setZeroTimeout = null
  }
  visible.value = true
  progress.value = 20

  incrementalInterval = setInterval(() => {
    if (progress.value < 80) {
      progress.value += Math.random() * (90 - progress.value) * 0.05
    } else {
      clearInterval(incrementalInterval!)
      incrementalInterval = null
    }
  }, 300)
}

const end = () => {
  if (incrementalInterval) {
    clearInterval(incrementalInterval)
    incrementalInterval = null
  }
  progress.value = 100
  if (setZeroTimeout) {
    clearTimeout(setZeroTimeout)
    setZeroTimeout = null
  }
  visible.value = false
  setZeroTimeout = setTimeout(() => {
    progress.value = 0
    clearTimeout(setZeroTimeout!)
    setZeroTimeout = null
  }, 300)
}

defineExpose({
  start,
  end,
})
</script>

<template>
  <div
    fixed
    top-0
    left-0
    w-screen
    z-100
    h-1
    bg-primary
    duration-200
    class="transition-[width,opacity]"
    ease-out
    :class="[visible ? 'opacity-100' : 'opacity-0']"
    :style="{
      width: `${progress}%`,
    }">
    <div
      bg-gradient-to-r
      from-transparent
      to-amber-500
      dark:to-amber-100
      h-full
      w-full
      blur-sm></div>
  </div>
</template>
