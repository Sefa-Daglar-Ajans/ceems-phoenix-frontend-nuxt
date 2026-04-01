import { useMutation } from '@pinia/colada'
import { api } from '~/utils/api'

interface ValidateDiscountBody {
  code: string
}

interface DiscountResult {
  valid: boolean
  discountPercent?: number
  code?: string
  message?: string
}

export function useValidateDiscountMutation() {
  return useMutation({
    mutation: (body: ValidateDiscountBody) =>
      api().post<DiscountResult>('/discounts/validate', body).then(r => r.data),
  })
}
