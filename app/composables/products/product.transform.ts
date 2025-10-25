import type { ProductListItem } from '.'
export function transformProductList(
  products: ProductListItem[]
): ProductListItem[] {
  return products.map(product => ({
    ...product,
    minPrice: currencyDivider(product.minPrice as number),
  }))
}
