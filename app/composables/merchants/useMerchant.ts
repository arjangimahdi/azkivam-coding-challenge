import { getMerchants, type Merchant } from '.'

export const useMerchant = () => {
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
    fetchMerchants,
  }
}
