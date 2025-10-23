import { useApi } from '~/composables/useApi'
import type { CategoryListResponse, NestedCategory } from '.'
import { transformCategoryList } from './category.transform'

export function getCategories() {
  return useApi().get<CategoryListResponse>('/categories')
}

export function getNestedCategories(): Promise<{ data: NestedCategory[] }> {
  return getCategories().then(response => ({
    data: transformCategoryList(response.data.data),
  }))
}
