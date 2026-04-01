import { useQuery } from '@pinia/colada'
import { api } from '~/utils/api'
import type { Product } from '~/types'

export function useProductQuery(id: string | number) {
  return useQuery({
    key: () => ['products', String(id)],
    query: () => api().get<Product>(`/products/${id}`).then(r => r.data),
  })
}
