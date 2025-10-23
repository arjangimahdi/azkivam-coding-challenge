<template>
  <div>
    <pre
      dir="ltr"
      wrap="hard"
      v-text="JSON.stringify(categories, null, 2)"
      class="p-4 text-xs"
    />
  </div>
</template>

<script setup lang="ts">
import { useCategory } from '~/composables/categories'

const { fetchCategories } = useCategory()

const { data: categories } = fetchCategories()
</script>
