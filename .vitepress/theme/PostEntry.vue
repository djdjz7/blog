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
      h-56
      w-full
      dark:bg-dark
      bg-light
      shadow-lg
      hover:shadow-2xl
      transition-all
      duration-200
      overflow-clip
      relative
      rounded-4
    >
      <div
        h-full
        absolute
        overflow-hidden
        backdrop-blur-2xl
        transition-all
        duration-200
        class="w-50% w-max-50% bg-light/70 dark:bg-dark/70 group-hover:w-full"
        top-0
        left-0
        p-4
        shadow-md
        flex="~ justify-center col"
      >
        <span m-t-auto text-2xl font-semibold>{{ title }}</span>
        <div
          style="
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
          "
          m-b-auto
          v-html="excerpt"
          text-gray
        ></div>
      </div>
      <img
        h-full
        w-full
        object-cover
        :src="
          splashImageSource == undefined
            ? '/assets/img/placeholder.webp'
            : splashImageSource
        "
      />
    </div>
  </a>
</template>
