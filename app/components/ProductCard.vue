<template>
  <NuxtLink
    :to="`/products/${product.slug}`"
    class="w-full h-full ring-1 ring-zinc-300 bg-white flex flex-col"
  >
    <NuxtImg
      class="aspect-square object-cover"
      :alt="product.name"
      :src="product.imageUrl"
      placeholder="https://placehold.co/600x400/EEE/31343C?font=lora&text=Product"
    />

    <div class="p-3 flex flex-col justify-between h-full">
      <h3 class="text-sm font-normal line-clamp-2 mb-3">
        {{ product.name }}
      </h3>

      <div class="flex flex-col gap-y-1">
        <span class="text-xs text-zinc-500">شروع قیمت از</span>
        <span class="text-sm font-bold">
          {{ product.minPrice }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { type ProductListItem } from '~/composables/products'

defineProps<{
  product: ProductListItem
}>()
</script>
