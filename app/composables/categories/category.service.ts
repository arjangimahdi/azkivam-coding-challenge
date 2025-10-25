import { useApi } from '~/composables/useApi'
import type { CategoryListResponse } from '.'

export function getCategories() {
  return useApi().get<CategoryListResponse>('/categories')
}
