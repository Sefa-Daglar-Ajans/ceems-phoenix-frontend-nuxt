import { useMutation, useQueryCache } from '@pinia/colada'
import { api } from '~/utils/api'

export function useCreateUserMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (body: Record<string, unknown>) =>
      api().post('/users', body).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['admin', 'users'] })
    },
  })
}

export function useUpdateUserMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: ({ id, ...body }: { id: number } & Record<string, unknown>) =>
      api().patch(`/users/${id}`, body).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['admin', 'users'] })
    },
  })
}

export function useDeleteUserMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (id: number) =>
      api().delete(`/users/${id}`).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['admin', 'users'] })
    },
  })
}

export function useCreateProductMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (body: Record<string, unknown>) =>
      api().post('/products', body).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['products'] })
    },
  })
}

export function useUpdateProductMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: ({ id, ...body }: { id: number } & Record<string, unknown>) =>
      api().patch(`/products/${id}`, body).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['products'] })
    },
  })
}

export function useDeleteProductMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (id: number) =>
      api().delete(`/products/${id}`).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['products'] })
    },
  })
}

export function useUpdateOrderStatusMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: ({ id, status }: { id: number; status: string }) =>
      api().patch(`/orders/${id}/status`, { status }).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['admin', 'orders'] })
      queryCache.invalidateQueries({ key: ['orders'] })
    },
  })
}

export function useCreateDiscountMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (body: Record<string, unknown>) =>
      api().post('/discounts', body).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['admin', 'discounts'] })
    },
  })
}

export function useUpdateDiscountMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: ({ id, ...body }: { id: number } & Record<string, unknown>) =>
      api().patch(`/discounts/${id}`, body).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['admin', 'discounts'] })
    },
  })
}

export function useUpsertSettingMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (body: { key: string; value: string }) =>
      api().put('/settings', body).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['settings'] })
    },
  })
}

export function useMarkContactReadMutation() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (id: number) =>
      api().patch(`/contacts/${id}/read`).then(r => r.data),
    onSettled() {
      queryCache.invalidateQueries({ key: ['admin', 'contacts'] })
    },
  })
}
