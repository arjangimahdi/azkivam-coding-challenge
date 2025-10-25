import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '~/constants'
import {
  getProductsByCategoryId,
  transformProductList,
  type ProductListItem,
} from '.'

export const useProductByCategory = (categoryId: number) => {
  const pageIndex = ref(DEFAULT_PAGE_INDEX)
  const pageSize = DEFAULT_PAGE_SIZE
  const isLoadingMore = ref(false)
  const reachedEnd = ref(false)
  const stateKey = `products_category_${categoryId}`
  const products = useState<ProductListItem[]>(stateKey, () => [])
  const totalItems = useState<number>('totalItems', () => 0)
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
  const fetchProductsByCategory = async () => {
    return useAsyncData<ProductListItem[]>(
      stateKey,
      async () => {
        try {
          const response = await getProductsByCategoryId(
            {
              merchantIds: merchantIds.value,
            },
            {
              page: pageIndex.value,
              size: pageSize,
            },
            categoryId
          )
          products.value = transformProductList(response.data.data)
          totalItems.value = response.data.totalItems
          return products.value
        } catch (err: any) {
          throw createError({
            statusCode: 500,
            statusMessage: `خطا در دریافت محصولات دسته بندی:\n${err.message}\n${err.response?.data?.message ?? ''}`,
          })
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

  const hasMore = computed(() => {
    return !reachedEnd.value && products.value.length < totalItems.value
  })

  const loadMore = async () => {
    if (isLoadingMore.value || !hasMore.value) return

    isLoadingMore.value = true

    try {
      pageIndex.value += 1
      const resp = await getProductsByCategoryId(
        { merchantIds: merchantIds.value },
        { page: pageIndex.value, size: pageSize },
        categoryId
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
    fetchProductsByCategory,
    products,
    isLoadingMore,
    reachedEnd,
    loadMore,
  }
}
