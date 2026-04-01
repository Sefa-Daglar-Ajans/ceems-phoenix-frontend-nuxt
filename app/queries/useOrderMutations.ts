import { useMutation, useQueryCache } from '@pinia/colada'
import { api } from '~/utils/api'

interface CreateOrderBody {
  addressId: number
  discountCode?: string
}

export function useCreateOrderMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (body: CreateOrderBody) =>
      api().post('/orders', body).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['orders'] })
      queryCache.invalidateQueries({ key: ['cart'] })
    },
  })
}
