import { defineQuery, useQuery } from '@pinia/colada'
import { api } from '~/utils/api'
import type { Product } from '~/types'

export const useProductsQuery = defineQuery(() => {
  return useQuery({
    key: ['products'],
    query: () => api().get<Product[]>('/products').then(r => r.data),
  })
})
