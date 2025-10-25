import { useApi } from '~/composables/useApi'
import type {
  ProductListResponse,
  ProductListRequestBody,
  ProductListRequestQuery,
} from '.'

export function getProducts(
  body: ProductListRequestBody,
  query: ProductListRequestQuery
) {
  return useApi().post<ProductListResponse>('/products', body, {
    query,
  })
}

export function getProductsByCategoryId(
  body: ProductListRequestBody,
  query: ProductListRequestQuery,
  categoryId: number
) {
  return useApi().post<ProductListResponse>(`/products/${categoryId}`, body, {
    query,
  })
}
