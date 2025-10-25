<template>
  <div class="flex flex-col gap-y-3 max-h-96 overflow-y-auto scrollbar-custom">
    <h5 class="text-sm font-medium">دسته بندی ها</h5>
    <div class="flex flex-col gap-y-2">
      <CategoryItem
        v-for="cat in categories"
        :key="cat.id"
        :category="cat"
        :depth="0"
        :expanded-ids="expandedIds"
        @toggle="onToggle"
        @select="onSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NestedCategory } from '~/composables/categories'

defineProps<{
  categories: NestedCategory[]
}>()

const expandedIds = useState<Set<number>>(
  'expandedCategoryIds',
  () => new Set()
)

function onToggle(id: number) {
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id)
  } else {
    expandedIds.value.add(id)
  }
  expandedIds.value = new Set(expandedIds.value)
}

function onSelect(category: NestedCategory) {
  const route = useRoute()
  const merchantIds = route.query.merchantIds
  navigateTo({
    path: `/products/${category.id}/${category.slug}`,
    query: merchantIds ? { merchantIds } : undefined,
  })
}
</script>
