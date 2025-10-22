<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Merchants List</h1>

    <Suspense v-if="!pending && !error">
      <template #default>
        <pre
          v-text="JSON.stringify(merchants, null, 2)"
          class="text-sm overflow-auto p-2 bg-zinc-300 rounded"
        />
      </template>
      <template #fallback>Loading...</template>
    </Suspense>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '../composables/useApi'

interface Merchant {
  id: number
  name: string
}

const {
  data: merchants,
  pending,
  error,
} = useAsyncData<Merchant[]>(
  'merchants',
  async () => {
    const api = useApi()
    try {
      const response = await api.get<{ data: Merchant[] }>('/merchants')
      return response.data.data
    } catch (err: any) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to fetch merchants: ${err.message}`,
      })
    }
  },
  {
    server: true,
  }
)
</script>
