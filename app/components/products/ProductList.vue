<template>
  <div class="w-full h-full">
    <div
      class="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-px items-stretch"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />

      <ProductCardSkeleton
        v-if="isLoading"
        v-for="i in DEFAULT_PAGE_SIZE"
        :key="`loader-${i}`"
      />
    </div>
    <div
      v-if="products.length === 0 && !isLoading"
      class="text-center text-sm text-zinc-500 py-4"
    >
      محصولی یافت نشد
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductCard, ProductCardSkeleton } from '.'
import { type ProductListItem } from '~/composables/products'
import { DEFAULT_PAGE_SIZE } from '~/constants'

const props = defineProps<{
  products: ProductListItem[]
  isLoading: boolean
}>()

const { products, isLoading } = toRefs(props)
</script>
