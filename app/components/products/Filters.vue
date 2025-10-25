<template>
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
</template>

<script setup lang="ts">
import { useCategory } from '~/composables/categories'
import { useMerchant } from '~/composables/merchants'
import { CategoryList, CategoryListSkeleton } from '~/components/categories'
import { MerchantList, MerchantListSkeleton } from '~/components/merchants'

const { fetchCategories } = useCategory()
const { fetchMerchants } = useMerchant()

const { data: categories, pending: categoriesPending } = fetchCategories()
const { data: merchants, pending: merchantsPending } = fetchMerchants()
</script>
