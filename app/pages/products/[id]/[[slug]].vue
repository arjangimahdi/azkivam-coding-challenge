<template>
  <div class="min-h-screen grid grid-cols-7 p-6 gap-x-6">
    <Filters />
    <div
      class="col-span-5 h-fit bg-zinc-50 ring-1 ring-zinc-300 rounded-lg overflow-hidden"
    >
      <ProductList :products="products" :is-loading="isLoadingMore" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'

import { ProductList, Filters } from '~/components/products'

import { useProductByCategory } from '~/composables/products'
import { useCategory } from '~/composables/categories'
import { useMerchant } from '~/composables/merchants'

const route = useRoute()
const categoryId = computed(() => Number(route.params.id))

const { fetchCategories } = useCategory()
const { fetchMerchants } = useMerchant()
const { fetchProductsByCategory, products, isLoadingMore, loadMore } =
  useProductByCategory(categoryId.value)

const { data: categories, pending: categoriesPending } = fetchCategories()
const { data: merchants, pending: merchantsPending } = fetchMerchants()

fetchProductsByCategory()

onMounted(() => {
  if (window) {
    useInfiniteScroll(window, loadMore, { distance: 0 })
  }
})

watch(categoryId, () => {
  fetchProductsByCategory()
})
</script>
