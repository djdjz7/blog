<script setup lang="ts">
import MainComponent from './components/MainComponent.vue'
import { SiteConfiguration } from './site'
import NewYearBg from './components/NewYearBg.vue'
// import { useDark } from '@vueuse/core'
// useDark()
</script>

<template>
  <div class="bg"></div>
  <NewYearBg v-if="SiteConfiguration.theme === 'new-year'" />
  <Suspense>
    <MainComponent z-1 relative />
  </Suspense>
</template>

<style lang="css">
.bg {
  background-image: radial-gradient(circle at top left, rgb(255, 246, 218), #fff 30%);
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

@media (prefers-color-scheme: dark) {
  .bg {
    background-image: radial-gradient(circle at top left, rgb(52, 39, 1), #121212 30%);
    background-color: #121212;
  }
}
</style>
