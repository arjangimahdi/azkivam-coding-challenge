<template>
  <div>
    <pre
      dir="ltr"
      wrap="hard"
      v-text="JSON.stringify(products, null, 2)"
      class="p-4 text-xs"
    />
  </div>
</template>

<script setup lang="ts">
import { type ProductListItem } from '~/composables/products'

defineProps<{
  products: ProductListItem[]
}>()
</script>
