<script setup lang="ts">
const props = defineProps({
  splashImageSource: {
    type: String,
    required: false,
  },
  title: String,
  excerpt: String,
  url: String,
});
</script>
<template>
  <a :href="url">
    <div
      text-dark
      dark:text-light
      class="group"
      h-52
      w-full
      dark:bg-dark
      bg-light
      shadow-lg
      hover:shadow-2xl
      transition-all
      duration-200
      overflow-clip
      relative
      flex="~ items-center justify-end"
      rounded-4
    >
      <div
        absolute
        h-100
        backdrop-blur-2xl
        transition-all
        duration-200
        class="w-50% bg-light/70 dark:bg-dark/70 group-hover:w-full"
        top-0
        left-0
        p-4
        shadow-md
      >
        <span text-2xl font-semibold>{{ title }}</span>
        <div v-html="excerpt"></div>
      </div>
      <img
        :src="
          splashImageSource == undefined
            ? '/assets/img/placeholder.webp'
            : splashImageSource
        "
      />
    </div>
  </a>
</template>
