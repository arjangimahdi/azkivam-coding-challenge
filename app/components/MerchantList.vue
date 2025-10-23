<template>
  <div>
    <pre
      dir="ltr"
      wrap="hard"
      v-text="JSON.stringify(merchants, null, 2)"
      class="text-xs"
    />
  </div>
</template>

<script setup lang="ts">
import type { Merchant } from '~/composables/merchants'

defineProps<{
  merchants: Merchant[]
}>()
</script>
