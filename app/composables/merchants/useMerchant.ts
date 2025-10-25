import { getMerchants, type Merchant } from '.'

export const useMerchant = () => {
  const route = useRoute()

  const merchantIds = computed<number[]>(() => {
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
  })

  const fetchMerchants = () => {
    return useAsyncData<Merchant[]>(
      'merchants',
      async () => {
        try {
          const response = await getMerchants()
          return response.data.data
        } catch (err: any) {
          throw createError({
            statusCode: 500,
            statusMessage: `خطا در دریافت فروشگاه ها:\n${err.message}\n${err.response.data.message}`,
          })
        }
      },
      {
        server: true,
        default: () => [],
      }
    )
  }

  return {
    merchantIds,
    fetchMerchants,
  }
}
