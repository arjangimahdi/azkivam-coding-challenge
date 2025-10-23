import type { ProductListItem } from '.'

export function transformProductList(products: ProductListItem[]) {
  return products.map(product => ({
    ...product,
    min: currencyDivider(product.minPrice),
  }))
}
