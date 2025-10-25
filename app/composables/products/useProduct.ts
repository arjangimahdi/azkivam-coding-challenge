import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/constants'
import { getProducts, transformProductList, type ProductListItem } from '.'
import { useMerchant } from '../merchants'

export const useProduct = () => {
  const { merchantIds } = useMerchant()

  const stateKey = 'products'

  const totalItems = useState<number>('totalItems', () => 0)
  const products = useState<ProductListItem[]>(stateKey, () => [])

  const pageIndex = ref(DEFAULT_PAGE_INDEX)
  const pageSize = DEFAULT_PAGE_SIZE
  const isLoadingMore = ref(false)
  const reachedEnd = ref(false)

  const hasMore = computed(
    () => !reachedEnd.value && products.value.length < totalItems.value
  )

  const fetchProducts = async () => {
    return useAsyncData<ProductListItem[]>(
      stateKey,
      async () => {
        isLoadingMore.value = true

        try {
          const response = await getProducts(
            {
              merchantIds: merchantIds.value,
            },
            {
              page: pageIndex.value,
              size: pageSize,
            }
          )
          products.value = transformProductList(response.data.data)
          totalItems.value = response.data.totalItems
          return products.value
        } catch (err: any) {
          throw createError({
            statusCode: 500,
            statusMessage: `خطا در دریافت محصولات:\n${err.message}\n${err.response.data.message}`,
          })
        } finally {
          isLoadingMore.value = false
        }
      },
      {
        lazy: true,
        server: true,
        default: () => [],
        watch: [merchantIds],
      }
    )
  }

  const loadMore = async () => {
    if (isLoadingMore.value || !hasMore.value) return

    isLoadingMore.value = true

    try {
      pageIndex.value += 1
      const resp = await getProducts(
        { merchantIds: merchantIds.value },
        { page: pageIndex.value, size: pageSize }
      )
      const newItems = transformProductList(resp.data.data)
      if (newItems.length < pageSize) reachedEnd.value = true
      products.value = [...products.value, ...newItems]
    } finally {
      isLoadingMore.value = false
    }
  }

  watch(
    merchantIds,
    () => {
      pageIndex.value = DEFAULT_PAGE_INDEX
      reachedEnd.value = false
      products.value = []
    },
    { deep: true }
  )

  return {
    fetchProducts,
    products,
    isLoadingMore,
    reachedEnd,
    loadMore,
  }
}
