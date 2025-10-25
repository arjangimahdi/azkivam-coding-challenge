<template>
  <div class="relative w-full">
    <input
      v-model="model"
      type="text"
      :placeholder="placeholder"
      class="w-full h-9 pr-3 pl-9 rounded-md ring-1 ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400 text-sm bg-zinc-100"
      @input="onInput"
    />
    <span
      class="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500"
      v-if="trailingIcon"
    >
      <Icon :name="trailingIcon" class="w-4 h-4" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { DEFAULT_SEARCH_DEBOUNCE_MS } from '~/constants'
import type { SearchInputEmits, SearchInputProps } from '~/types/searchInput'

const props = defineProps<SearchInputProps>()
const emit = defineEmits<SearchInputEmits>()

const model = defineModel<string>({ default: '' })

const debouncedEmit = useDebounceFn(() => {
  emit('change', model.value)
}, props.debounceMs ?? DEFAULT_SEARCH_DEBOUNCE_MS)

function onInput() {
  debouncedEmit()
}
</script>
