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
