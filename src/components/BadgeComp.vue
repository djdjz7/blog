<script setup lang="ts">
defineProps<{
  type: 'primary' | 'success' | 'warning' | 'danger';
  text: string;
}>();
const mappedType = {
  primary: 'blue',
  success: 'green',
  warning: 'yellow',
  danger: 'red',
};
</script>
<template>
  <span bg-opacity-20 :class="[`bg-${mappedType[type]}-200`, `text-${mappedType[type]}-500`, `dark:bg-${mappedType[type]}-800`]" p-x-2 p-y-1 rounded-full text-sm font-normal vertical-mid>{{ text }}</span>
</template>
