<script setup lang="ts">
import { usePreferredReducedMotion } from '@vueuse/core'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import confetti from 'canvas-confetti'

const reduceMotion = usePreferredReducedMotion()
const trigger = useTemplateRef('trigger')
const observer = new IntersectionObserver((entries) => {
  if (entries[0]?.isIntersecting) {
    // just copy-paste from canvas-confetti demo...
    const end = Date.now() + 10 * 1000
    const colors = ['#f2e935', '#f4d883', '#f28135']
    ;(function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        disableForReducedMotion: true,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        disableForReducedMotion: true,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
  }
})

onMounted(() => {
  if (trigger.value) {
    observer.observe(trigger.value)
  }
})

onUnmounted(() => {
  observer.disconnect()
})
</script>

<template>
  <div ref="trigger" h-0></div>
  <slot v-if="reduceMotion === 'reduce'"></slot>
</template>
