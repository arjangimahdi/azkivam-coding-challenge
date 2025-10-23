export interface Category {
  id: number
  name: string
  slug: string
  enabled: boolean
  priority: number
  mapped: boolean
  parent: number | null
}

export interface NestedCategory extends Omit<Category, 'parent'> {
  children: NestedCategory[]
}

export interface CategoryListResponse {
  data: Category[]
}
