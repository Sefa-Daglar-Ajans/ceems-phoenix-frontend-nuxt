import { useMutation, useQueryCache } from '@pinia/colada'
import { api } from '~/utils/api'

interface AddToCartBody {
  productId: number
  quantity: number
}

interface UpdateCartItemBody {
  quantity: number
}

export function useAddToCartMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (body: AddToCartBody) =>
      api().post('/carts/items', body).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['cart'] })
    },
  })
}

export function useUpdateCartItemMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: ({ productId, ...body }: UpdateCartItemBody & { productId: number }) =>
      api().patch(`/carts/items/${productId}`, body).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['cart'] })
    },
  })
}

export function useRemoveCartItemMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (productId: number) =>
      api().delete(`/carts/items/${productId}`).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['cart'] })
    },
  })
}

export function useClearCartMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: () =>
      api().delete('/carts').then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['cart'] })
    },
  })
}
