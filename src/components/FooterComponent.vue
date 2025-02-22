<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer text-center flex="~ col items-center" text-sm text-gray-400 dark:text-truegray-600>
    <span>© 2023 - {{ year }}</span>
  </footer>
</template>
