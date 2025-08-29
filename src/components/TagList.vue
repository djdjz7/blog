<script setup lang="ts">
defineProps<{
  tags: string[]
}>()

const selectedTag = defineModel<string>({
  default: '',
})
</script>

<template>
  <div flex="~ wrap" gap-2>
    <div v-for="tag in tags" :key="tag">
      <a
        rounded-full
        flex="~ col gap-2"
        text-unset
        p-x-2
        p-y-1
        box-border
        cursor-pointer
        decoration-none
        border="1 solid transparent"
        transition
        :href="`/tags/#${tag}`"
        :class="[
          tag == selectedTag
            ? 'bg-amber-50! border-amber-100 text-primary! dark:bg-amber-950! dark:border-amber-900! dark:text-primary-dark!'
            : 'bg-gray-200/30 dark:bg-gray-200/10',
        ]"
        @click="selectedTag = tag">
        {{ tag }}
      </a>
    </div>
  </div>
</template>
