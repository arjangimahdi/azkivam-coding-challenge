/**
 * Example usage of nested categories transformation
 * This file demonstrates how to use the category transformation
 */

import { getNestedCategories } from './category.service'
import type { NestedCategory } from './types'

// Example: Fetch and use nested categories
export async function exampleUsage() {
  try {
    const response = await getNestedCategories()
    const nestedCategories: NestedCategory[] = response.data

    // Now you have a nested structure like:
    // [
    //   {
    //     id: 1,
    //     name: "Electronics",
    //     priority: 1,
    //     children: [
    //       {
    //         id: 2,
    //         name: "Phones",
    //         priority: 1,
    //         children: []
    //       },
    //       {
    //         id: 3,
    //         name: "Laptops",
    //         priority: 2,
    //         children: []
    //       }
    //     ]
    //   }
    // ]

    console.log('Nested categories:', nestedCategories)
    return nestedCategories
  } catch (error) {
    console.error('Failed to fetch nested categories:', error)
    throw error
  }
}

// Example: Recursive function to render nested categories
export function renderCategories(
  categories: NestedCategory[],
  level = 0
): string {
  return categories
    .map(category => {
      const indent = '  '.repeat(level)
      let result = `${indent}- ${category.name} (Priority: ${category.priority})\n`

      if (category.children.length > 0) {
        result += renderCategories(category.children, level + 1)
      }

      return result
    })
    .join('')
}
