<script setup lang="ts">
import { HomeIcon, BookOpenIcon } from "@heroicons/vue/24/outline";
import { useData } from "vitepress";
import { inject } from "vue";
const props = defineProps<{
  category: String;
  excerpt: String;
  frontmatter: any;
  url: String;
}>();
const { isDark } = useData();

const toggleAppearance = inject("toggle-appearance", () => {
  isDark.value = !isDark.value;
});
</script>
<template>
  <div class="recent-post" relative h-lg>
    <img
      absolute
      h-full
      w-full
      object-cover
      :src="
        frontmatter.splash == undefined
          ? '/assets/img/placeholder.webp'
          : frontmatter.splash
      "
    />
    <div
      class="blur-wrapper bg-gray/32"
      absolute
      top-0
      left-0
      right-0
      bottom-0
      backdrop-blur-lg
    ></div>

    <div
      max-w-1000px
      mx-auto
      absolute
      top-32px
      left-32px
      right-32px
      bottom-32px
      md:top-64px
      md:left-64px
      md:right-64px
      md:bottom-64px
    >
      <div absolute left-0 top-0>
        <h1 class="text-white/90" drop-shadow-lg>{{ props.category }}</h1>
      </div>
      <div absolute top-0 right-0 flex gap-4>
        <button
          hover:brightness-120
          transition-all
          duration-150
          self-start
          p-2
          text-sm
          rounded-full
          backdrop-blur-xl
          shadow-lg
          class="text-white/90 glow-border bg-gray/32"
          @click="toggleAppearance"
        >
          <span
            :class="{ 'vpi-moon': isDark, 'vpi-sun': !isDark }"
            h-4
            w-4
            block
          >
          </span>
        </button>
        <a
          class="no-underline! bg-gray/32 glow-border"
          hover:brightness-120
          transition-all
          duration-150
          self-start
          p-2
          text-sm
          rounded-full
          backdrop-blur-xl
          shadow-lg
          href="/"
        >
          <HomeIcon class="text-white/90 h-4 w-4" />
        </a>
      </div>
      <div absolute bottom-0 left-0 flex="~ col" gap-3>
        <div
          flex="~ items-center"
          gap-1
          uppercase
          tracking-wider
          class="text-white/90"
          text-sm
        >
          <span>Recent Post</span>
          <span>·</span>
          <span>{{ props.frontmatter.time }}</span>
        </div>
        <h1 m-0 class="text-white/90" drop-shadow-lg>
          {{ props.frontmatter.title }}
        </h1>
        <a
          :href="props.url"
          class="no-underline! text-white/90! bg-gray/32 glow-border"
          hover:brightness-120
          transition-all
          duration-150
          self-start
          p-x-6
          p-y-2
          text-sm
          rounded-full
          backdrop-blur-xl
          shadow-lg
          flex="~ items-center gap-1"
          ><BookOpenIcon class="text-white/90 h-5 w-5"></BookOpenIcon>Read
          more...</a
        >
      </div>
      <div
        v-if="Boolean(props.excerpt)"
        absolute
        right-0
        bottom-0
        backdrop-blur-xl
        shadow-xl
        max-w-30vw
        text-sm
        line-clamp-4
        class="bg-gray/25 p-x-4 p-y-1.5 rounded-lg text-white/90 glow-border"
      >
        <span class="excerpt" v-html="props.excerpt" p-0></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blur-wrapper {
  mask: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1));
}

.excerpt:deep(p) {
  margin: 0;
}

.glow-border {
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

h1 {
  font-size: 32px;
  font-weight: 500;
}

.vpi-sun {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Cpath d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41'/%3E%3C/svg%3E");
}
.vpi-moon {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'/%3E%3C/svg%3E");
}

[class^="vpi-"].bg,
[class*=" vpi-"].bg,
.vp-icon.bg {
  background-size: 100% 100%;
  background-color: transparent;
}
[class^="vpi-"]:not(.bg),
[class*=" vpi-"]:not(.bg),
.vp-icon:not(.bg) {
  -webkit-mask: var(--icon) no-repeat;
  mask: var(--icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
}
</style>
