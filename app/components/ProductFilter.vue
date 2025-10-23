<template>
  <div>
    <pre
      dir="ltr"
      wrap="hard"
      v-text="JSON.stringify(categories, null, 2)"
      class="text-xs"
    />
  </div>
</template>

<script setup lang="ts">
import type { NestedCategory } from '~/composables/categories'

defineProps<{
  categories: NestedCategory[]
}>()
</script>
