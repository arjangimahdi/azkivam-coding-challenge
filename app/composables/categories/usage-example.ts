/**
 * Example demonstrating the nested category transformation
 */

import { transformCategoryList } from './category.transform'
import type { Category } from './types'

// Example flat category data
const flatCategories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    enabled: true,
    priority: 1,
    mapped: true,
    parent: null,
  },
  {
    id: 2,
    name: 'Phones',
    slug: 'phones',
    enabled: true,
    priority: 1,
    mapped: true,
    parent: 1, // Parent is Electronics (id: 1)
  },
  {
    id: 3,
    name: 'Laptops',
    slug: 'laptops',
    enabled: true,
    priority: 2,
    mapped: true,
    parent: 1, // Parent is Electronics (id: 1)
  },
  {
    id: 4,
    name: 'iPhone',
    slug: 'iphone',
    enabled: true,
    priority: 1,
    mapped: true,
    parent: 2, // Parent is Phones (id: 2)
  },
  {
    id: 5,
    name: 'Android',
    slug: 'android',
    enabled: true,
    priority: 2,
    mapped: true,
    parent: 2, // Parent is Phones (id: 2)
  },
  {
    id: 6,
    name: 'Clothing',
    slug: 'clothing',
    enabled: true,
    priority: 2,
    mapped: true,
    parent: null,
  },
]

// Transform the flat array into nested structure
const nestedCategories = transformCategoryList(flatCategories)

console.log('Nested Categories Result:')
console.log(JSON.stringify(nestedCategories, null, 2))

// Expected output structure:
/*
[
  {
    "id": 1,
    "name": "Electronics",
    "slug": "electronics",
    "enabled": true,
    "priority": 1,
    "mapped": true,
    "children": [
      {
        "id": 2,
        "name": "Phones",
        "slug": "phones",
        "enabled": true,
        "priority": 1,
        "mapped": true,
        "children": [
          {
            "id": 4,
            "name": "iPhone",
            "slug": "iphone",
            "enabled": true,
            "priority": 1,
            "mapped": true,
            "children": []
          },
          {
            "id": 5,
            "name": "Android",
            "slug": "android",
            "enabled": true,
            "priority": 2,
            "mapped": true,
            "children": []
          }
        ]
      },
      {
        "id": 3,
        "name": "Laptops",
        "slug": "laptops",
        "enabled": true,
        "priority": 2,
        "mapped": true,
        "children": []
      }
    ]
  },
  {
    "id": 6,
    "name": "Clothing",
    "slug": "clothing",
    "enabled": true,
    "priority": 2,
    "mapped": true,
    "children": []
  }
]
*/
