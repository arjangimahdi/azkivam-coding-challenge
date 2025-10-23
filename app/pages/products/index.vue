<template>
  <div class="min-h-screen grid grid-cols-7 p-6 gap-x-6">
    <div
      dir="ltr"
      class="col-span-2 h-fit bg-zinc-50 ring-1 ring-zinc-300 rounded-lg sticky top-6 z-10 p-4"
    >
      <ProductFilter :categories="categories" v-if="!categoriesPending" />
      <div v-else class="p-4 text-xs">Loading...</div>
      <hr class="my-4" />
      <MerchantList :merchants="merchants" v-if="!merchantsPending" />
      <div v-else class="p-4 text-xs">Loading...</div>
    </div>
    <div
      class="col-span-5 h-fit bg-zinc-50 ring-1 ring-zinc-300 rounded-lg p-4"
    >
      <ProductWrapper :products="products" v-if="!productsPending" />
      <div v-else class="p-4 text-xs">Loading...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProduct } from '~/composables/products'
import { useMerchant } from '~/composables/merchants'
import { useCategory } from '~/composables/categories'

const ProductWrapper = defineAsyncComponent(
  () => import('~/components/ProductWrapper.vue')
)
const ProductFilter = defineAsyncComponent(
  () => import('~/components/ProductFilter.vue')
)
const MerchantList = defineAsyncComponent(
  () => import('~/components/MerchantList.vue')
)

const { fetchProducts } = useProduct()
const { fetchMerchants } = useMerchant()
const { fetchCategories } = useCategory()

const { data: products, pending: productsPending } = fetchProducts()
const { data: merchants, pending: merchantsPending } = fetchMerchants()
const { data: categories, pending: categoriesPending } = fetchCategories()
</script>
