import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/constants'
import { getProducts, transformProductList, type ProductListItem } from '.'

export const useProduct = () => {
  const pageIndex = ref(DEFAULT_PAGE_INDEX)
  const pageSize = DEFAULT_PAGE_SIZE
  const isLoadingMore = ref(false)
  const reachedEnd = ref(false)
  const products = useState<ProductListItem[]>('products', () => [])

  const fetchProducts = async () => {
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
              size: pageSize,
            }
          )
          products.value = transformProductList(response.data.data)
          return products.value
        } catch (err: any) {
          throw createError({
            statusCode: 500,
            statusMessage: `خطا در دریافت محصولات:\n${err.message}\n${err.response.data.message}`,
          })
        }
      },
      {
        lazy: true,
        server: true,
        default: () => [],
      }
    )
  }

  const hasMore = computed(() => {
    return !reachedEnd.value && products.value.length > 0
  })

  const loadMore = async () => {
    if (isLoadingMore.value || !hasMore.value) return

    isLoadingMore.value = true

    try {
      pageIndex.value += 1
      const resp = await getProducts(
        { merchantIds: [] },
        { page: pageIndex.value, size: pageSize }
      )
      const newItems = transformProductList(resp.data.data)
      if (newItems.length < pageSize) reachedEnd.value = true
      products.value = [...products.value, ...newItems]
    } finally {
      isLoadingMore.value = false
    }
  }

  return {
    fetchProducts,
    products,
    isLoadingMore,
    reachedEnd,
    loadMore,
  }
}
