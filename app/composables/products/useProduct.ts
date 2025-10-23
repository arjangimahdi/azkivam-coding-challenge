import { type ProductListItem, getProducts, transformProductList } from '.'

export const useProduct = () => {
  const pageIndex = ref(1)
  const pageSize = ref(4)

  const fetchProducts = () => {
    return useAsyncData<ProductListItem[]>(
      'products',
      async () => {
        try {
          const response = await getProducts(
            {
              merchantIds: [],
            },
            {
              page: pageIndex.value,
              size: pageSize.value,
            }
          )
          return response.data.data
        } catch (err: any) {
          throw createError({
            statusCode: 500,
            statusMessage: `خطا در دریافت محصولات:\n${err.message}\n${err.response.data.message}`,
          })
        }
      },
      {
        server: true,
        default: () => [],
        transform: transformProductList,
      }
    )
  }

  return {
    fetchProducts,
  }
}
