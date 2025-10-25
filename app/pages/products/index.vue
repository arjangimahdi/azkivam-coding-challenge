<template>
  <div class="min-h-screen grid grid-cols-7 p-6 gap-x-6">
    <div
      class="col-span-2 h-fit bg-zinc-50 ring-1 ring-zinc-300 rounded-lg sticky top-6 z-10 p-4"
    >
      <h4 class="text-base font-medium mb-3">فیلتر ها</h4>
      <CategoryList :categories="categories" v-if="!categoriesPending" />
      <CategoryListSkeleton v-else />
      <hr class="my-4" />
      <MerchantList :merchants="merchants" v-if="!merchantsPending" />
      <MerchantListSkeleton v-else />
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

import { ProductList } from '~/components/products'
import { CategoryListSkeleton, CategoryList } from '~/components/categories'
import { MerchantListSkeleton, MerchantList } from '~/components/merchants'

const { fetchCategories } = useCategory()
const { fetchMerchants } = useMerchant()
const { fetchProducts, products, isLoadingMore, loadMore } = useProduct()

const { data: categories, pending: categoriesPending } = fetchCategories()
const { data: merchants, pending: merchantsPending } = fetchMerchants()
fetchProducts()

onMounted(() => {
  if (window) {
    useInfiniteScroll(window, loadMore, { distance: 0 })
  }
})
</script>
