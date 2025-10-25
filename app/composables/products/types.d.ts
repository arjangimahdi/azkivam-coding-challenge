export interface ProductListItem {
  id: string
  name: string
  slug: string
  available: boolean
  categoryId: number
  minPrice: string | number
  imageUrl: string
}

export interface Product extends ProductListItem {
  maxPrice: number
  azkivam: boolean
  hidden: boolean
  merchantName: string
  merchantId: number
}

export interface ProductListResponse {
  data: ProductListItem[]
  totalItems: number
}

export interface ProductListRequestQuery {
  page: number
  size: number
}

export interface ProductListRequestBody {
  merchantIds: number[]
}
