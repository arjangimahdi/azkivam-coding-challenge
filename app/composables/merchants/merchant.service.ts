import { useApi } from '~/composables/useApi'
import type { MerchantListResponse } from '.'

export function getMerchants() {
  return useApi().get<MerchantListResponse>('/merchants')
}
