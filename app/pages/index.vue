<template>
  <div class="p-8">
    <NuxtLink
      class="bg-blue-500 text-white px-4 py-2 rounded-md"
      to="/products"
    >
      Products
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi'

interface Merchant {
  id: number
  name: string
}

const api = useApi()

const {
  data: merchants,
  pending,
  error,
} = useAsyncData<Merchant[]>(
  'merchants',
  async () => {
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
