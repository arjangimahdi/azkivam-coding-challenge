export interface Merchant {
  id: number
  name: string
  enabled?: boolean
  description?: string
}

export interface MerchantListResponse {
  data: Merchant[]
}
