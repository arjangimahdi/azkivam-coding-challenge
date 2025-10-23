<template>
  <div class="min-h-screen grid grid-cols-7 p-6 gap-x-6">
    <div
      dir="ltr"
      class="col-span-2 h-fit bg-zinc-50 ring-1 ring-zinc-300 rounded-lg sticky top-6 z-10 p-4"
    ></div>
    <div class="col-span-5 bg-zinc-50 ring-1 ring-zinc-300 rounded-lg">
      <Suspense v-if="!pending && !error">
        <template #fallback>
          <div class="p-4 text-xs">Loading...</div>
        </template>
        <template #default>
          <ProductWrapper :products="products" />
        </template>
      </Suspense>
      <div v-else>
        <div class="p-4 text-xs">Loading...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProduct } from '~/composables/products'

const ProductWrapper = defineAsyncComponent(
  () => import('~/components/ProductWrapper.vue')
)

const { fetchProducts } = useProduct()
const { data: products, pending, error } = fetchProducts()
</script>
