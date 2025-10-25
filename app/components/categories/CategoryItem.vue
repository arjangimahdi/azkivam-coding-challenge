<template>
  <div class="flex flex-col w-full">
    <div
      class="w-full flex items-center gap-x-2 py-1 text-right hover:bg-zinc-100 justify-between"
      :style="{ paddingRight: (depth + 1) * 12 + 'px' }"
    >
      <button type="button" class="text-sm text-right" @click="selectSelf">
        {{ category.name }}
      </button>
      <button
        v-if="isExpandable"
        type="button"
        class="w-4 h-4 flex items-center justify-center"
        :aria-expanded="isExpanded"
        :aria-label="isExpanded ? 'collapse category' : 'expand category'"
        @click="toggleSelf"
      >
        <Icon
          :name="isExpanded ? 'lucide:chevron-down' : 'lucide:chevron-left'"
          class="w-4 h-4 text-zinc-500"
        />
      </button>
      <span class="w-4" v-else aria-hidden="true"></span>
    </div>

    <div v-if="isExpanded" class="flex flex-col">
      <CategoryItem
        v-for="child in category.children"
        :key="child.id"
        :category="child"
        :depth="depth + 1"
        :expanded-ids="expandedIds"
        @toggle="forwardToggle"
        @select="forwardSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryEmits, CategoryProps } from '~/types/categories'
import type { NestedCategory } from '~/composables/categories'

const props = defineProps<CategoryProps>()

const emit = defineEmits<CategoryEmits>()

const isExpandable = computed(() => props.category.children?.length > 0)
const isExpanded = computed(
  () => isExpandable.value && props.expandedIds.has(props.category.id)
)

function toggleSelf() {
  if (isExpandable.value) emit('toggle', props.category.id)
}

function forwardToggle(id: number) {
  emit('toggle', id)
}

function selectSelf() {
  emit('select', props.category)
}

function forwardSelect(category: NestedCategory) {
  emit('select', category)
}
</script>
