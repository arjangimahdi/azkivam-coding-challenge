import type { Category, NestedCategory } from './types'

export function transformCategoryList(
  categories: Category[]
): NestedCategory[] {
  const categoryMap = new Map<number, NestedCategory>()
  const rootCategories: NestedCategory[] = []

  categories.forEach(category => {
    const nestedCategory: NestedCategory = {
      id: category.id,
      name: category.name,
      slug: category.slug,
      enabled: category.enabled,
      priority: category.priority,
      mapped: category.mapped,
      children: [],
    }
    categoryMap.set(category.id, nestedCategory)
  })

  categories.forEach(category => {
    const nestedCategory = categoryMap.get(category.id)!

    if (category.parent === null) {
      rootCategories.push(nestedCategory)
    } else {
      const parent = categoryMap.get(category.parent)
      if (parent) {
        parent.children.push(nestedCategory)
      }
    }
  })

  const sortByPriority = (categories: NestedCategory[]): NestedCategory[] => {
    return categories
      .sort((a, b) => a.priority - b.priority)
      .map(category => ({
        ...category,
        children: sortByPriority(category.children),
      }))
  }

  return sortByPriority(rootCategories)
}
