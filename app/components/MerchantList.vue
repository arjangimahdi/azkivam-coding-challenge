<template>
  <div>
    <SearchInput
      v-model="query"
      class="mb-4"
      placeholder="جستجوی فروشگاه"
      trailingIcon="lucide:search"
      :debounce-ms="400"
      @change="onQueryChange"
    />
    <div class="flex flex-col max-h-48 overflow-y-auto scrollbar-custom">
      <Checkbox
        class="p-2"
        v-for="m in filteredMerchants"
        :key="m.id"
        v-model="selectedMap[m.id]"
        :label="m.name"
        @change="onMerchantChange(m.id, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Merchant } from '~/composables/merchants'

const props = defineProps<{
  merchants: Merchant[]
}>()

const query = ref('')
const filteredMerchants = ref<Merchant[]>(props.merchants)
const selectedMap = reactive<Record<number, boolean>>({})

const route = useRoute()
const router = useRouter()

function onQueryChange(value: string) {
  filteredMerchants.value = props.merchants.filter(m => m.name.includes(value))
}

function onMerchantChange(id: number, checked: boolean) {
  selectedMap[id] = checked
  updateQueryFromSelected()
}

function parseMerchantIdsFromQuery(): number[] {
  const q = route.query.merchantIds
  if (!q) return []
  if (Array.isArray(q))
    return q.map(v => Number(v)).filter(n => Number.isFinite(n))
  if (typeof q === 'string')
    return q
      .split(',')
      .map(v => Number(v))
      .filter(n => Number.isFinite(n))
  return []
}

function updateSelectedMapFromQuery() {
  const ids = new Set(parseMerchantIdsFromQuery())
  for (const m of props.merchants) {
    selectedMap[m.id] = ids.has(m.id)
  }
}

function updateQueryFromSelected() {
  const ids = Object.entries(selectedMap)
    .filter(([, v]) => Boolean(v))
    .map(([k]) => Number(k))
    .filter(n => Number.isFinite(n))

  const nextQuery: Record<string, any> = { ...route.query }

  if (ids.length > 0) {
    nextQuery.merchantIds = ids.join(',')
  } else {
    delete nextQuery.merchantIds
  }

  router.replace({ query: nextQuery })
}

onMounted(() => {
  updateSelectedMapFromQuery()
})

watch(
  () => route.query.merchantIds,
  () => {
    updateSelectedMapFromQuery()
  }
)
</script>
