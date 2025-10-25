<template>
  <label class="inline-flex items-center gap-x-2 select-none cursor-pointer">
    <input
      type="checkbox"
      class="peer sr-only"
      :name="name"
      :disabled="disabled"
      v-model="model"
      @change="emit('change', !!model)"
    />
    <span
      class="w-4 h-4 inline-flex items-center justify-center rounded-[4px] ring-1 ring-zinc-300 bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-zinc-400 transition-colors"
      :class="{
        'bg-zinc-900 ring-zinc-900': model && !disabled,
        'opacity-50 cursor-not-allowed': disabled,
      }"
      aria-hidden="true"
    >
      <Icon v-if="model" name="lucide:check" class="w-3 h-3 text-white" />
    </span>
    <span v-if="label" class="text-sm text-zinc-800">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import type { CheckboxEmits, CheckboxProps } from '~/types/checkbox'

defineProps<CheckboxProps>()
const emit = defineEmits<CheckboxEmits>()

const model = defineModel<boolean>({ default: false })
</script>
