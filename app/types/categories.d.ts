import type { NestedCategory } from '~/composables/categories'

export interface CategoryProps {
  depth: number
  category: NestedCategory
  expandedIds: Set<number>
}

export interface CategoryEmits {
  toggle: [id: number]
  select: [category: NestedCategory]
}
