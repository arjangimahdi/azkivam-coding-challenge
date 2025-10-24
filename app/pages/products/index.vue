<template>
  <div class="min-h-screen grid grid-cols-7 p-6 gap-x-6">
    <div
      class="col-span-2 h-fit bg-zinc-50 ring-1 ring-zinc-300 rounded-lg sticky top-6 z-10 p-4"
    >
      <ProductFilter :categories="categories" v-if="!categoriesPending" />
      <div v-else class="p-4 text-xs">Loading...</div>
      <hr class="my-4" />
      <MerchantList :merchants="merchants" v-if="!merchantsPending" />
      <div v-else class="p-4 text-xs">Loading...</div>
    </div>
    <div
      class="col-span-5 h-fit bg-zinc-50 ring-1 ring-zinc-300 rounded-lg overflow-hidden"
    >
      <ProductList :products="products" :is-loading="isLoadingMore" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'

import { useProduct } from '~/composables/products'
import { useCategory } from '~/composables/categories'
import { useMerchant } from '~/composables/merchants'

const ProductList = defineAsyncComponent(
  () => import('~/components/ProductList.vue')
)

const ProductFilter = defineAsyncComponent(
  () => import('~/components/ProductFilter.vue')
)

const MerchantList = defineAsyncComponent(
  () => import('~/components/MerchantList.vue')
)

const { fetchCategories } = useCategory()
const { fetchMerchants } = useMerchant()
const { fetchProducts, products, isLoadingMore, loadMore } = useProduct()

fetchProducts()
const { data: categories, pending: categoriesPending } = fetchCategories()
const { data: merchants, pending: merchantsPending } = fetchMerchants()

onMounted(() => {
  if (window) {
    useInfiniteScroll(window, loadMore, { distance: 0 })
  }
})
</script>
