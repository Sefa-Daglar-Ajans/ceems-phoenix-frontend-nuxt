import { defineQuery, useQuery } from '@pinia/colada'
import { api } from '~/utils/api'

interface Order {
  id: number
  status: string
  totalPrice: number
  items: OrderItem[]
  address: Record<string, unknown>
  createdAt: string
}

interface OrderItem {
  productId: number
  name: string
  price: number
  quantity: number
}

export const useOrdersQuery = defineQuery(() => {
  return useQuery({
    key: ['orders'],
    query: () => api().get<Order[]>('/orders').then(r => r.data),
  })
})

export function useOrderQuery(id: number) {
  return useQuery({
    key: () => ['orders', id],
    query: () => api().get<Order>(`/orders/${id}`).then(r => r.data),
  })
}
